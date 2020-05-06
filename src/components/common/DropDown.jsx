import React, { Component } from 'react'

export class DropDown extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        const { value, id, arrData  } = this.props
        const data = arrData.map(obj => { 
            return (<option value = {obj.value}>{obj.text}</option>)
        })

        return (
            <div>
            <select value = { value } id = {id}>{data}</select>
             </div>
        )
    }
}

