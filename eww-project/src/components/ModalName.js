import 'rodal/lib/rodal.css';
import React from 'react';
import Rodal from 'rodal';
import initeww from '../components/images/initeww.gif';
import dataService from '../services/dataService';
import withUser from '../helpers/withUser';
import { setEwwInfo } from '../redux/actions/ewwDataAction';
import { connect } from 'react-redux';


class ModalName extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            nameEww: "",
            errorMessage: ""

        };
    }

    onInputChange = (e) => {
        this.setState({ nameEww: e.target.value })
    }

    onCreateEww = async (e) => {
        e.preventDefault();
        console.log('has pulsado submit')
        if (this.state.nameEww === "") {
            this.setState({ errorMessage: "Debes poner nombre a tu Eww" })
        } else {
            const ewwData = {
                birth: new Date(),
                cleanbar: 100,
                foodbar: 100,
                funbar: 100,
                id: "",
                name: this.state.nameEww,
                poohs: 0,
                status: "alive",
                uid: this.props.userInfo.uid,
            }

            console.log(ewwData);
            const ewwId = await dataService.addEww(ewwData)
            if (ewwId) {
                ewwData.id = ewwId;
                this.props.setEwwInfo(ewwData);
                this.setState({ visible: false })
            }
        }
    }

    componentDidMount() {
        console.log(this.props.visible)
        this.setState({ visible: this.props.visible })
    }

    componentDidUpdate(prevProps) {
        console.log("PrevProps", prevProps);
        console.log("Props", this.props)

        if (prevProps.visible !== this.props.visible) {
            console.log("Modal info de user")
            this.setState({ visible: this.props.visible })
        }
        if (prevProps.ewwData !== this.props.ewwData) {
            console.log("info de eww")
            console.log(this.props.ewwData)
        }
    }

    show = () => {
        this.setState({ visible: true });
    }

    hide = () => {
        this.setState({ visible: false });
    }
    render() {
        return (
            <div>
                <button style={{ display: "none" }} onClick={this.show}>Eww's name</button>
                <Rodal
                    width={400}
                    height={400}
                    className="init-modal"
                    visible={this.state.visible}
                    animation="door"
                    tabindex="-1"
                    onClose={() => { }}
                >
                    <img className="image-modal" src={initeww} />
                    <div className="header">
                        GIVE THE EWW A NAME
            </div>
                    <div className="body">
                        <form onSubmit={this.onCreateEww}>
                            <input onChange={this.onInputChange} type="text" />
                            <button type="submit">OK</button>
                        </form>
                        <button onClick={this.hide} className="rodal-cancel-btn">CLOSE</button>
                        <div>{this.state.errorMessage}</div>
                    </div>
                </Rodal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ewwInfo: state.ewwDataReducer.ewwData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        setEwwInfo: (eww) => dispatch(setEwwInfo(eww)),
    }
}

export default withUser(connect(mapStateToProps, mapDispatchToProps)(ModalName));