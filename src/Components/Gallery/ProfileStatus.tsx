import React from 'react'

type StateType= {
    editMode: boolean
}
type PropsType = {
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
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
    //OnChange= (e: ChangeEvent<HTMLInputElement>)
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
                    <input onBlur={this.DeactivateMode} autoFocus={true} value={this.props.status}></input>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus