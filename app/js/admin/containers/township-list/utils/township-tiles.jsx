import React from 'react';
import { Link } from 'react-router'

export default class TownshipTiles extends React.Component {
  render() {
		return(
			<div className="animated fadeInUp container">
				<div className="row marginless-row">
					<div className="col s12 m12 l6">
						<Link to={{pathname: `/admin/township/${this.props.townshipCode}`}} 
						className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
								<i className="material-icons valign">&#xE7F1;</i>
								<h4> Township Panel </h4>
						</Link>
					</div>
					<div className="col s12 m12 l6">
						<Link to={{pathname: `/admin/inspector/${this.props.townshipCode}`}} 
						className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
							<i className="material-icons valign">&#xE90D;</i>
							<h4> Inspector Panel </h4>
						</Link>
					</div>
				</div>
				<div className="row marginless-row">
					<div className="col s12 m12 l6">
						<Link to={{pathname: `/admin/bursar/${this.props.townshipCode}`}}  
						className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
							<i className="material-icons valign">&#xE227;</i>
							<h4> Bursar Panel </h4>
						</Link>
					</div>
					<div className="col s12 m12 l6">
						<a 
						className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
							<i className="material-icons valign">&#xE8B8;</i>
							<h4> Settings (N/A) </h4>
						</a>
					</div>
				</div>
			</div>
		);
  }
}