import React, { Component } from 'react'

export default class Contact extends Component {
    render() {
        return (
            <div>
                <input type="text" placeholder="Your Email"/>
                <input type="text" placeholder="Subject"/>
                <textarea name="content" id="" cols="30" rows="10" placeholder="Your question"></textarea>
            </div>
        )
    }
}
