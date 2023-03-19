use nalgebra::DMatrix;
use std::collections::HashMap;

use crate::analytics::{
    algo_result_enums::diff_cen::{DiffCenError, DiffCenMap},
    algos_config::Params,
};

fn query_node_id(
    id: usize,
    int_to_node_id: &HashMap<usize, String>,
) -> Result<String, DiffCenError> {
    let id = int_to_node_id
        .get(&id)
        .ok_or(DiffCenError::NodeIdLookupError(id as u32))?;

    Ok(id.to_owned())
}

/// Calculates the diffusion centrality of each node in the graph.
/// Diffusion centrality is a measure of how much information a node
/// can diffuse to other nodes in the graph.
///
/// # Arguments
///
/// * `g` - The graph to calculate diffusion centrality for.
///
/// # Returns
///
/// * `Option<HashMap<String, HashMap<String, f64>>>` - A hashmap of node ids to a hashmap of node ids to diffusion centrality values.
pub fn diffusion_centrality(
    adj_matrix: &DMatrix<f64>,
    int_to_node_id: HashMap<usize, String>,
    params: &Params,
    eigenvals: Vec<f64>,
    n: usize,
) -> Result<DiffCenMap, DiffCenError> {
    let t_param = params.get("T").unwrap_or(&(5_u32));

    let mut node_to_diffcen = HashMap::new();

    let largest_eigenvalue = eigenvals
        .iter()
        .max_by(|a, b| a.total_cmp(b))
        .unwrap_or(&1.0);

    let q = 1.0 / largest_eigenvalue;

    let identity_matrix = DMatrix::<f64>::identity(n, n);

    let mut h_matrix = DMatrix::zeros(n, n);

    for t in 1..t_param + 1 {
        h_matrix += (q * adj_matrix).pow(t) * &identity_matrix;

        let mut node_to_diffcen_at_t = HashMap::new();

        for (i, row) in h_matrix.row_iter().enumerate() {
            let row_sum = row.sum();

            // divide the row by the sum of the row
            let row_normalized = row.map(|x| x / row_sum);

            let mut node_to_diffcen_inner = HashMap::new();
            for (j, col) in row_normalized.iter().enumerate() {
                if i == j {
                    let sum = row.sum();
                    node_to_diffcen_inner.insert(query_node_id(j, &int_to_node_id)?, sum);
                    continue;
                }

                node_to_diffcen_inner.insert(query_node_id(j, &int_to_node_id)?, *col);
            }

            node_to_diffcen_at_t.insert(query_node_id(i, &int_to_node_id)?, node_to_diffcen_inner);
        }

        node_to_diffcen.insert(t.to_string(), node_to_diffcen_at_t);
    }

    Ok(node_to_diffcen)
}