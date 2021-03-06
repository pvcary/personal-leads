import React, { Component } from 'react'

import { LabeledTextInput, FlatButton } from './dd-ui'

import { Alert, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableHighlight, Text, View, ScrollView, Image, Modal, TextInput, Button, StyleSheet} from 'react-native'
import client, { Avatar } from '@doubledutch/rn-client'

export class EditCardView extends Component{
	constructor(props){
    super(props)
    // Use state to hold form data.
    // Initialize all values from props
    this.state={
      id:props.id,
      firstName:props.firstName,
      lastName:props.lastName,
      title:props.title,
      company:props.company,
      mobile:props.mobile,
      email:props.email,
      linkedin:props.linkedin,
      twitter:props.twitter
    }
  }

  // Use the supplied key to assign the value
	onChange = (value,key) => {
		this.setState({[key]: value})
	}

	// Hand form state over to function passed in through props
	onSave(){
		this.props.updateCard(this.state)
	}

	render(){
		return(
			<KeyboardAvoidingView behavior={Platform.select({ios: "padding", android: null})} style={{backgroundColor:'#dedede',paddingTop:32,paddingLeft:8,paddingRight:8,position:'absolute',top:0,bottom:0,left:0,right:0}}>
				<ScrollView>
					<LabeledTextInput id="firstName" label="First Name" value={this.props.firstName} onChangeText={this.onChange}/>
					<LabeledTextInput id="lastName" label="Last Name" value={this.props.lastName} onChangeText={this.onChange}/>
					<LabeledTextInput id="title" label="Title" value={this.props.title} onChangeText={this.onChange} />
					<LabeledTextInput id="company" label="Company" value={this.props.company} onChangeText={this.onChange} />
					<LabeledTextInput id="mobile" label="Phone number" value={this.props.mobile} onChangeText={this.onChange} />
					<LabeledTextInput id="email" label="Email" value={this.props.email} onChangeText={this.onChange} />
					<LabeledTextInput id="linkedin" label="LinkedIn" value={this.props.linkedin} onChangeText={this.onChange} />
					<LabeledTextInput id="twitter" label="Twitter" value={this.props.twitter} onChangeText={this.onChange} />
					<View style={{flexDirection:'row',marginTop:6}}>
						<FlatButton onPress={this.props.hideModal} title='Cancel' style={{marginRight:4}} />
						<FlatButton onPress={this.onSave.bind(this)} title='Save' style={{marginLeft:4}} />
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		)
	}
}

export class CardView extends Component{
	render() {
		return(
			<View style={{margin: 8}}>
				<View style={{padding: 8, backgroundColor:"#FFFFFF",borderRadius:4,flexDirection:'row'}}>
          <Avatar user={this.props.user} client={client} size={64} style={{marginRight: 8}} />
					<View style={{flexDirection:'column',flex:1}}>
						<Text style={{fontSize:18}}>{this.props.firstName} {this.props.lastName}</Text>
						<Text style={{fontWeight:'bold',marginBottom:8}}>{this.props.title}</Text>
						<Text>{this.props.company}</Text>
						<Text>{this.props.email}</Text>
						<Text>{this.props.mobile}</Text>
            { this.props.twitter && <Text>Twitter: @{this.props.twitter}</Text> }
            { this.props.linkedin && <Text>LinkedIn: {this.props.linkedin}</Text> }
					</View>
				</View>
				<View style={{backgroundColor:'rgba(0,0,0,0.1)',height:2,marginLeft:16,marginRight:16}}></View>
			</View>
		)
	}
}

export class CardListItem extends Component{
	render() {
		if(this.props.showExpanded){
			return(
				<TouchableOpacity onPress={this.props.showCard} style={{flex:1,marginBottom:8}}>
					<View style={{flex:1}}>
						<CardView {...this.props} />
						<View>
							<FlatButton onPress={this.props.onDelete} title='Delete' style={{backgroundColor:"#FF5500",marginLeft:60,marginRight:60,color:'#FFFFFF',marginTop:8}} />
						</View>
					</View>
				</TouchableOpacity>
			)
		}
		return(
			<TouchableOpacity onPress={this.props.showCard} style={{flex:1}}>
				<View style={{padding:8,backgroundColor:"#FFFFFF",borderBottomWidth:2,borderColor:'#dedede',flexDirection:'row'}}>
          <Avatar user={this.props.user} client={client} size={32} style={{marginRight: 8}} />
					<View style={{flex:1}}>
						<Text style={{fontWeight:'bold',flexWrap:'wrap'}}>{this.props.firstName} {this.props.lastName}</Text>
						<Text style={{flexWrap:'wrap'}}>{this.props.title}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}
