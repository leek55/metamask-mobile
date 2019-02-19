import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import AssetIcon from '../AssetIcon';
import Identicon from '../Identicon';
import contractMap from 'eth-contract-metadata';

const styles = StyleSheet.create({
	itemLogoWrapper: {
		width: 50,
		height: 50,
		overflow: 'hidden',
		borderRadius: 25
	}
});

/**
 * View that renders an ERC-20 Token logo
 */
export default class TokenElement extends Component {
	static propTypes = {
		/**
		 * Asset object
		 */
		asset: PropTypes.object,
		/**
		 * Style to apply to main view
		 */
		containerStyle: PropTypes.object,
		/**
		 * Style to apply to image
		 */
		iconStyle: PropTypes.object
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.asset.address !== this.props.asset.address;
	}

	render = () => {
		const { asset, containerStyle, iconStyle } = this.props;
		if (asset.address in contractMap) {
			asset.logo = contractMap[asset.address].logo;
		}

		return (
			<View style={[styles.itemLogoWrapper, containerStyle]}>
				{asset.logo ? (
					<AssetIcon logo={asset.logo} customStyle={iconStyle} />
				) : (
					<Identicon address={asset.address} customStyle={iconStyle} />
				)}
			</View>
		);
	};
}