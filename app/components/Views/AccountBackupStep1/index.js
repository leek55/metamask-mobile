import React, { Component } from 'react';
import { Platform, ScrollView, Alert, TouchableOpacity, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors, fontStyles } from '../../../styles/common';
import StyledButton from '../../UI/StyledButton';
import Button from '../../UI/Button';
import Pager from '../../UI/Pager';
import { strings } from '../../../../locales/i18n';

const styles = StyleSheet.create({
	mainWrapper: {
		backgroundColor: colors.white,
		flex: 1
	},
	scrollviewWrapper: {
		flex: 1
	},
	wrapper: {
		flex: 1,
		padding: 20,
		paddingTop: Platform.OS === 'android' ? 0 : 20,
		paddingBottom: 0
	},
	content: {
		alignItems: 'flex-start'
	},
	title: {
		width: 260,
		fontSize: 32,
		marginLeft: 20,
		marginTop: Platform.OS === 'android' ? 0 : 20,
		marginBottom: 20,
		color: colors.fontPrimary,
		justifyContent: 'center',
		textAlign: 'left',
		...fontStyles.normal
	},
	text: {
		marginLeft: 20,
		marginRight: 20,
		marginBottom: 10,
		justifyContent: 'center'
	},
	label: {
		marginBottom: 20,
		lineHeight: 23,
		fontSize: 16,
		color: colors.fontPrimary,
		textAlign: 'left',
		...fontStyles.normal
	},
	buttonWrapper: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	learnMoreButton: {
		backgroundColor: colors.transparent,
		flex: 0,
		height: 60
	},
	learnMore: {
		color: colors.primary,
		fontSize: 18
	},
	bold: {
		lineHeight: 25,
		...fontStyles.bold
	},
	recommended: {
		alignSelf: 'center',
		marginBottom: 25,
		paddingHorizontal: 17,
		paddingVertical: 9,
		backgroundColor: colors.yellow,
		borderRadius: 8
	},
	recommendedText: {
		color: colors.fontPrimary,
		fontSize: 12,
		...fontStyles.normal
	},
	navbarRightButton: {
		alignSelf: 'flex-end',
		paddingHorizontal: 28,
		paddingVertical: 20
	},
	navbarRightText: {
		fontSize: 18,
		color: colors.primary,
		...fontStyles.normal
	}
});

/**
 * View that's shown during the first step of
 * the backup seed phrase flow
 */
export default class AccountBackupStep1 extends Component {
	static propTypes = {
		/**
		/* navigation object required to push and pop other views
		*/
		navigation: PropTypes.object
	};

	goNext = () => {
		this.props.navigation.navigate('AccountBackupStep2', { ...this.props.navigation.state.params });
	};

	dismiss = () => {
		Alert.alert(
			strings('account_backup_step_1.cancel_backup_title'),
			strings('account_backup_step_1.cancel_backup_message'),
			[
				{
					text: strings('account_backup_step_1.cancel_backup_ok'),
					onPress: () => {
						this.props.navigation.popToTop();
						this.props.navigation.goBack(null);
					}
				},
				{
					text: strings('account_backup_step_1.cancel_backup_no'),
					onPress: () => null,
					style: 'cancel'
				}
			],
			{ cancelable: false }
		);
	};

	learnMore = () =>
		this.props.navigation.navigate('BrowserView', {
			url: 'https://support.metamask.io'
		});

	render() {
		return (
			<SafeAreaView style={styles.mainWrapper}>
				<ScrollView
					contentContainerStyle={styles.scrollviewWrapper}
					style={styles.mainWrapper}
					testID={'account-backup-step-1-screen'}
				>
					<Pager pages={5} />
					<TouchableOpacity onPress={this.dismiss} style={styles.navbarRightButton}>
						<Text style={styles.navbarRightText}>{strings('account_backup_step_1.skip')}</Text>
					</TouchableOpacity>
					<View style={styles.wrapper} testID={'protect-your-account-screen'}>
						<View style={styles.content}>
							<Text style={styles.title}>{strings('account_backup_step_1.title')}</Text>
							<View style={styles.recommended}>
								<Text style={styles.recommendedText}>
									{strings('account_backup_step_1.highly_recommended')}
								</Text>
							</View>
							<View style={styles.text}>
								<Text style={styles.label}>{strings('account_backup_step_1.info_text_1')}</Text>
								<Text style={styles.label}>{strings('account_backup_step_1.info_text_2')}</Text>
								<Text style={styles.bold}>{strings('account_backup_step_1.important')}</Text>
								<Text style={styles.label}>{strings('account_backup_step_1.info_text_3')}</Text>
							</View>
						</View>
						<View style={styles.buttonWrapper}>
							<StyledButton
								containerStyle={styles.button}
								type={'confirm'}
								onPress={this.goNext}
								testID={'submit-button'}
							>
								{strings('account_backup_step_1.cta_text')}
							</StyledButton>
							<Button
								style={styles.learnMoreButton}
								onPress={this.learnMore}
								testID={'learn-more-button'}
							>
								<Text style={styles.learnMore}>{strings('account_backup_step_1.learn_more')}</Text>
							</Button>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}