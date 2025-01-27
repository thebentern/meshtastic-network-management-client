use crate::device;
// use crate::{ipc::commands::GraphGeoJSONResult};
use log::{debug, trace};
use tauri::Manager;

use super::ConfigurationStatus;

pub fn dispatch_updated_device(
    handle: &tauri::AppHandle,
    device: &device::MeshDevice,
) -> tauri::Result<()> {
    debug!("Dispatching updated device");

    handle.emit_all("device_update", device)?;

    trace!("Dispatched updated device");

    Ok(())
}

pub fn dispatch_updated_edges(
    _handle: &tauri::AppHandle,
    graph: &mut device::MeshGraph,
) -> tauri::Result<()> {
    debug!("Dispatching updated edges");

    let _edges = super::helpers::generate_graph_edges_geojson(graph);
    let _nodes = geojson::FeatureCollection {
        bbox: None,
        features: vec![],
        foreign_members: None,
    };

    // * This is temporarily disabled until we can figure out how to get the graph to update in-place
    // handle.emit_all::<GraphGeoJSONResult>("graph_update", GraphGeoJSONResult { nodes, edges })?;

    debug!("Dispatched updated edges");

    Ok(())
}

pub fn dispatch_configuration_status(
    handle: &tauri::AppHandle,
    status: ConfigurationStatus,
) -> tauri::Result<()> {
    debug!("Dispatching configuration status");
    handle.emit_all("configuration_status", status)
}

pub fn dispatch_rebooting_event(handle: &tauri::AppHandle) -> tauri::Result<()> {
    debug!("Dispatching rebooting event");
    let current_time_sec = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_secs();

    handle.emit_all("reboot", current_time_sec)
}
