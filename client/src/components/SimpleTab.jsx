import React, { useState } from "react";
import { Tabs, Tab, Table } from "react-bootstrap";
function SimpleTab() {
	const [key, setKey] = useState("home");

	return (
		<Tabs
			id="SimpleTab"
			activeKey={key}
			onSelect={(k) => setKey(k)}
			className="p-0 mb-3 bg-primary"
		>
			<Tab eventKey="description" title="Description"></Tab>
			<Tab eventKey="details" title="Details">
				<Table striped bordered hover size="sm">
					<tbody>
						<tr>
							<td>1</td>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
						</tr>
						<tr>
							<td>3</td>
							<td colSpan="2">Larry the Bird</td>
							<td>@twitter</td>
						</tr>
					</tbody>
				</Table>
			</Tab>
		</Tabs>
	);
}

export default SimpleTab;
