import React, { Component, PropTypes } from "react";
import classNames from "classnames";

class GrayButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { link, children, ...otherProps } = this.props;
		const validClassNames = classNames({
			"btn": true,
			"gray-btn": true
		});
		return (
			<a
				href={link}
				className={validClassNames}
				onClick={this.handleClick}
				{...otherProps}>
					{children}
			</a>
		);
	}
}

GrayButton.PropTypes = {
	link: PropTypes.bool,
	children: PropTypes.node
};

export default GrayButton;