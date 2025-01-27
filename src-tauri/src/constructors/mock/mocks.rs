#![allow(dead_code)]

use crate::analytics::data_structures::neighbor_info::{Neighbor, NeighborInfo};
use crate::constructors::init::init_edge_map::as_key;
use crate::data_conversion::distance_conversion::{
    get_spherical_distance, gps_degrees_to_protobuf_field,
};
use crate::device::helpers::get_current_time_u32;
use crate::device::MeshNode;
use app::protobufs;
use rand::distributions::Uniform;
use rand::prelude::*;
use rand::seq::SliceRandom;
use std::collections::HashMap;

// Generate a list of neighborinfo packets for a given number of nodes and optional percent connectedness
pub fn mock_neighborinfo_packets(
    num_nodes: i32,
    opt_percent_connected: Option<f64>,
) -> Vec<NeighborInfo> {
    let percent_connected = opt_percent_connected.unwrap_or(1.0);
    let mut neighborinfo_vec = Vec::new();
    for node_id in 0..num_nodes {
        let new_neighbor = NeighborInfo {
            // Assign sequential ids
            id: node_id as u32,
            // Assign zero time for now
            timestamp: 0,
            // Initialize empty neighbor lists
            neighbors: Vec::new(),
        };
        neighborinfo_vec.push(new_neighbor)
    }

    // Add all the edges to a vector, then shuffle it and pick the first x edges to add to the graph
    let mut all_edges_vec = Vec::new();
    for node_id in 0..num_nodes {
        for neighbor_id in 0..num_nodes {
            if node_id != neighbor_id {
                all_edges_vec.push((node_id, neighbor_id));
            }
        }
    }
    all_edges_vec.shuffle(&mut rand::thread_rng());
    let num_added_edges = (all_edges_vec.len() as f64 * percent_connected) as i32;
    for edge_num in 0..num_added_edges {
        let first_neighbor_id = all_edges_vec[edge_num as usize].0;
        let second_neighbor_id = all_edges_vec[edge_num as usize].1;
        let mut rng = rand::thread_rng();
        let rand_nbr_snr: f64 = rng.gen();
        // Push a copy of the second neighbor into the first neighbor's neighbor list
        let edge_neighbor = Neighbor {
            id: neighborinfo_vec[second_neighbor_id as usize].id,
            snr: rand_nbr_snr,
            timestamp: 0,
        };
        neighborinfo_vec[first_neighbor_id as usize]
            .neighbors
            .push(edge_neighbor);
    }
    neighborinfo_vec
}

// Generate a list of meshnode packets for a given number of nodes, within the Hanover area
pub fn mock_meshnode_packets(num_nodes: i32) -> Vec<MeshNode> {
    let mut meshnode_vec = Vec::new();
    for node_id in 0..num_nodes {
        const HANOVER_LAT_PREFIX: f64 = 43.70;
        const HANOVER_LON_PREFIX: f64 = 72.28;

        let latlngalt: (i32, i32, i32) = gps_degrees_to_protobuf_field(
            HANOVER_LAT_PREFIX + rand::random::<f64>() * 0.01,
            HANOVER_LON_PREFIX + rand::random::<f64>() * 0.01,
            rand::random::<f64>() * 100.0,
        );

        let position = protobufs::Position {
            latitude_i: latlngalt.0,
            longitude_i: latlngalt.1,
            altitude: latlngalt.2,
            time: 0,
            location_source: 0,
            altitude_source: 0,
            timestamp: 0,
            timestamp_millis_adjust: 0,
            altitude_hae: 0,
            altitude_geoidal_separation: 0,
            pdop: 0,
            hdop: 0,
            vdop: 0,
            gps_accuracy: 0,
            ground_speed: 0,
            ground_track: 0,
            fix_quality: 0,
            fix_type: 0,
            sats_in_view: 0,
            sensor_id: 0,
            next_update: 0,
            seq_number: 0,
        };

        let user = protobufs::User {
            id: "test".to_string(),
            long_name: "test".to_string(),
            short_name: "test".to_string(),
            macaddr: Vec::new(),
            hw_model: 0,
            is_licensed: false,
        };

        let device_metrics = protobufs::DeviceMetrics {
            battery_level: 0,
            voltage: 0.0,
            channel_utilization: 0.0,
            air_util_tx: 0.0,
        };

        let node_info = protobufs::NodeInfo {
            num: node_id as u32,
            user: Some(user),
            position: Some(position),
            device_metrics: Some(device_metrics),
            ..Default::default()
        };

        let mut meshnode = MeshNode::new(node_id.try_into().expect("Node ID cannot be negative"));
        meshnode.update_from_node_info(node_info);

        meshnode_vec.push(meshnode);
    }
    meshnode_vec
}

// Generate a map of edges and their weights from the current location info for mocking purposes
// Do not repeat edges.
pub fn mock_edge_map_from_loc_info(
    nodes: HashMap<u32, MeshNode>,
    radius: Option<f64>,
) -> HashMap<(u32, u32), (f64, u64)> {
    // Connect nodes if their distance is less than a certain threshold radius, r, in km
    let default_radius = Uniform::from(1..100).sample(&mut rand::thread_rng()) as f64;
    let r = radius.unwrap_or(default_radius);
    let mut edge_map = HashMap::new();
    for (node_id, node) in nodes.iter() {
        for (neighbor_id, neighbor) in nodes.iter() {
            if node_id != neighbor_id && !edge_map.contains_key(&as_key(*neighbor_id, *node_id)) {
                let distance = get_spherical_distance(Some(node), Some(neighbor)).unwrap();
                if distance < r {
                    let snr = nodes
                        .get(neighbor_id)
                        .unwrap()
                        .last_heard
                        .as_ref()
                        .unwrap()
                        .snr;
                    let time = get_current_time_u32();
                    edge_map.insert(as_key(*node_id, *neighbor_id), (snr as f64, time as u64));
                }
            }
        }
    }
    edge_map
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_init_neighborinfo_packets() {
        let neighborinfo = mock_neighborinfo_packets(3, Some(0.8));
        println!("{:?}", neighborinfo);
        assert_eq!(neighborinfo.len(), 3);
    }

    #[test]
    fn test_init_meshnode_packets() {
        let meshnodes = mock_meshnode_packets(3);
        println!("{:?}", meshnodes);
        assert_eq!(meshnodes.len(), 3);
    }

    #[test]
    fn test_mock_edge_map_from_loc_info() {
        let meshnodes = mock_meshnode_packets(3);
        let mut nodes = HashMap::new();
        for node in meshnodes {
            nodes.insert(node.node_num, node);
        }
        let edge_map = mock_edge_map_from_loc_info(nodes, None);
        println!("{:?}", edge_map);
        assert!(edge_map.len() <= 3);
    }

    #[test]
    fn test_mock_edge_map_with_single_node() {
        let meshnodes = mock_meshnode_packets(1);
        let mut nodes = HashMap::new();
        for node in meshnodes {
            nodes.insert(node.node_num, node);
        }
        let edge_map = mock_edge_map_from_loc_info(nodes, None);
        println!("{:?}", edge_map);
        assert_eq!(edge_map.len(), 0);
    }

    // Set radius to 1 cm. No edges should be generated, although statistically there is a tiny chance we get one
    #[test]
    fn test_mock_edge_map_with_small_radius() {
        let meshnodes = mock_meshnode_packets(3);
        let mut nodes = HashMap::new();
        for node in meshnodes {
            nodes.insert(node.node_num, node);
        }
        let edge_map = mock_edge_map_from_loc_info(nodes, Some(0.00001));
        println!("{:?}", edge_map);
        assert_eq!(edge_map.len(), 0);
    }
}
