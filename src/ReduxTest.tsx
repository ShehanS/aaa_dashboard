import React, {FC} from "react";
import {connect, ConnectedProps} from "react-redux";
import {decrement, increment} from "./redux/login/counter-slice";
import {RootState} from "./redux/store";
import {login} from "./redux/login/login-slice";


type ReduxProps = ConnectedProps<typeof connector>;

const ReduxTest: FC<ReduxProps> = ({onIncrement, onDecrement, onLogin}) => {

    const handleLogin = () => {
        const user = {
            username: 'shehan',
            password: 'shehan@123'
        }
        onLogin(user);
    }

    return (
        <div>
            <div>
                <button aria-label="Increment value" onClick={onIncrement}>
                    Increment
                </button>
                {/*<span>{count}</span>*/}
                <button aria-label="Decrement value" onClick={onDecrement}>
                    Decrement
                </button>
                <button aria-label="Decrement value" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        // count: state.counter.value,
    };
};


const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogin: (user: any) => dispatch(login(user)),
        onIncrement: (data: any) => dispatch(increment()),
        onDecrement: (accessToken: any) => dispatch(decrement()),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ReduxTest);
