import React from 'react'

class ProfileStatus extends React.Component {
        state = {
            editMode: false,
        }
    ActivateMode = () => {
        this.setState({
            editMode: true,
        })
    }
    DeactivateMode = () => {
        this.setState({
            editMode: false,
        })
    }
    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.ActivateMode}>{this.props.status}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onBlur={this.DeactivateMode} autoFocus={true} value={this.state.status}></input>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus