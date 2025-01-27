use crate::analytics::aux_functions::edge_factory::edge_factory;
use crate::data_conversion::distance_constants::{
    ALT_CONVERSION_FACTOR, LAT_CONVERSION_FACTOR, LON_CONVERSION_FACTOR, SPEED_CONVERSION_FACTOR,
};
use crate::data_conversion::distance_conversion::get_spherical_distance;
use crate::device::MeshNode;
use crate::graph::graph_ds::Graph;
use crate::graph::node::Node;
use log::warn;
use petgraph::graph::NodeIndex;
use std::collections::HashMap;

use super::init_edge_map::GraphEdgeMetadata;

// Create a graph from a hashmap of edge info and a hashmap of node location info
// Hashmaps will be stored in our `MeshDevice` struct
pub fn init_graph(
    snr_hashmap: &HashMap<(u32, u32), GraphEdgeMetadata>,
    loc_hashmap: &HashMap<u32, MeshNode>,
) -> Graph {
    let mut graph = Graph::new();
    let mut edge_left_endpoints = Vec::<NodeIndex>::new();
    let mut edge_right_endpoints = Vec::<NodeIndex>::new();
    let mut edge_distances = Vec::<f64>::new();
    let mut edge_radio_quality = Vec::<f64>::new();

    for neighbor_pair in snr_hashmap {
        let node_id = neighbor_pair.0 .0;
        let neighbor_id = neighbor_pair.0 .1;
        let snr = neighbor_pair.1.snr;
        let node_loc = loc_hashmap.get(&node_id);
        let neighbor_loc = loc_hashmap.get(&neighbor_id);

        let node_idx = add_node_and_location_to_graph(node_id, &mut graph, node_loc);
        let neighbor_idx = add_node_and_location_to_graph(neighbor_id, &mut graph, neighbor_loc);
        let distance = get_spherical_distance(node_loc, neighbor_loc).unwrap();

        edge_left_endpoints.push(node_idx);
        edge_right_endpoints.push(neighbor_idx);
        edge_distances.push(distance);
        edge_radio_quality.push(snr);
    }

    let edges = edge_factory(
        edge_left_endpoints,
        edge_right_endpoints,
        edge_distances,
        edge_radio_quality,
        None,
        None,
    );

    for edge in edges {
        graph.add_edge_from_struct(edge);
    }

    graph
}

pub fn add_node_and_location_to_graph(
    node_id: u32,
    graph: &mut Graph,
    node_loc: Option<&MeshNode>,
) -> NodeIndex {
    let name: String = node_id.to_string();
    if !graph.contains_node(name.clone()) {
        let mut node = Node::new(name.clone());
        if let Some(node_loc) = node_loc {
            let node_pos = &node_loc.position_metrics.last();
            if let Some(node_pos) = node_pos {
                node.latitude = node_pos.latitude as f64 * LAT_CONVERSION_FACTOR;
                node.longitude = node_pos.longitude as f64 * LON_CONVERSION_FACTOR;
                node.altitude = node_pos.altitude as f64 * ALT_CONVERSION_FACTOR;
                node.speed = node_pos.ground_speed as f64 * SPEED_CONVERSION_FACTOR;
                node.direction = node_pos.ground_track as f64;
            } else {
                warn!("We do not have position info for node {}", name);
            }
        }

        return graph.add_node_from_struct(node);
    }

    let node_idx = graph.get_node_idx(&name);
    let node = graph
        .get_node_mut(node_idx)
        .expect("Index from edge should exist");

    if let Some(node_loc) = node_loc {
        let node_pos = &node_loc.position_metrics.last();
        if let Some(node_pos) = node_pos {
            let latitude = node_pos.latitude as f64 * LAT_CONVERSION_FACTOR;
            let longitude = node_pos.longitude as f64 * LON_CONVERSION_FACTOR;
            let altitude = node_pos.altitude as f64 * ALT_CONVERSION_FACTOR;
            node.set_gps(longitude, latitude, altitude);
        }
    }

    graph.get_node_idx(&name)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::analytics::data_structures::neighbor_info::Neighbor;
    use crate::device::NormalizedPosition;

    #[test]
    fn test_init_graph() {
        let mut meshnode_1 = MeshNode::new(1);
        meshnode_1
            .position_metrics
            .push(NormalizedPosition::default());

        let mut meshnode_2 = MeshNode::new(2);
        meshnode_2
            .position_metrics
            .push(NormalizedPosition::default());

        let mut meshnode_3 = MeshNode::new(3);
        meshnode_3
            .position_metrics
            .push(NormalizedPosition::default());

        let mut meshnode_4 = MeshNode::new(4);
        meshnode_4
            .position_metrics
            .push(NormalizedPosition::default());

        let mut loc_hashmap: HashMap<u32, MeshNode> = HashMap::new();
        let mut snr_hashmap: HashMap<(u32, u32), GraphEdgeMetadata> = HashMap::new();

        loc_hashmap.insert(1, meshnode_1);
        loc_hashmap.insert(2, meshnode_2);
        loc_hashmap.insert(3, meshnode_3);
        loc_hashmap.insert(4, meshnode_4);

        snr_hashmap.insert(
            (1, 2),
            GraphEdgeMetadata {
                snr: 0.9,
                timestamp: 0,
            },
        );

        snr_hashmap.insert(
            (1, 3),
            GraphEdgeMetadata {
                snr: 0.9,
                timestamp: 0,
            },
        );

        snr_hashmap.insert(
            (1, 4),
            GraphEdgeMetadata {
                snr: 0.9,
                timestamp: 0,
            },
        );

        snr_hashmap.insert(
            (2, 3),
            GraphEdgeMetadata {
                snr: 0.9,
                timestamp: 0,
            },
        );

        snr_hashmap.insert(
            (2, 4),
            GraphEdgeMetadata {
                snr: 0.9,
                timestamp: 0,
            },
        );

        snr_hashmap.insert(
            (3, 4),
            GraphEdgeMetadata {
                snr: 0.9,
                timestamp: 0,
            },
        );

        let graph = init_graph(&snr_hashmap, &loc_hashmap);
        // Check that the graph has the correct number of nodes
        assert_eq!(graph.get_order(), 4);
        // Check that the graph has the correct number of edges
        assert_eq!(graph.get_size(), 6);
    }

    #[test]
    fn test_single_edge() {
        let neighbor_1 = Neighbor {
            id: 1,
            timestamp: 0,
            snr: 0.9,
        };

        let neighbor_2 = Neighbor {
            id: 2,
            timestamp: 100,
            snr: 0.1,
        };

        let lat_1 = 43.7022;
        let lng_1 = 72.2882;
        let alt_1 = 0;

        let distance_1_info = NormalizedPosition {
            latitude: lat_1,
            longitude: lng_1,
            altitude: alt_1,
            ..Default::default()
        };

        let mut meshnode_1 = MeshNode::new(1);
        meshnode_1.position_metrics.push(distance_1_info);

        let lat_2 = 43.7030;
        let lng_2 = 72.2890;
        let alt_2 = 0;

        let distance_2_info = NormalizedPosition {
            latitude: lat_2,
            longitude: lng_2,
            altitude: alt_2,
            ..Default::default()
        };

        let mut meshnode_2 = MeshNode::new(2);
        meshnode_2.position_metrics.push(distance_2_info);

        let mut loc_hashmap: HashMap<u32, MeshNode> = HashMap::new();
        let mut snr_hashmap: HashMap<(u32, u32), GraphEdgeMetadata> = HashMap::new();

        loc_hashmap.insert(1, meshnode_1);
        loc_hashmap.insert(2, meshnode_2);

        snr_hashmap.insert(
            (1, 2),
            GraphEdgeMetadata {
                snr: 0.1,
                timestamp: 100,
            },
        );

        let mut graph = init_graph(&snr_hashmap, &loc_hashmap);

        // Check that the graph has the correct number of edges
        assert_eq!(graph.get_size(), 1);

        // Check the edge weights to check that they are both the weight of the 1-2 edge, which has neighbor 2's SNR
        // Assert that the 1-2 edge is the correct (smaller) SNR
        let first_edge_weight = graph.get_edge_weight(
            &neighbor_1.id.to_string(),
            &neighbor_2.id.to_string(),
            None,
            Some(false),
        );
        // The correct weight should a sum of the two distances normalized w 0.1 radio quality, which is this float
        assert_eq!(first_edge_weight, 1.0);
    }
}
