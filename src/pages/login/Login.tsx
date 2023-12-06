import React, {FC, useState} from "react";
import {Alert, Button, Card, CardContent, FormControl, IconButton, Input, Stack, Typography} from "@mui/joy";
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import LockPersonRoundedIcon from '@mui/icons-material/LockPersonRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import {useNavigate} from "react-router-dom";
import FormLabel from "@mui/joy/FormLabel";


type Input = {
    InputValue: any;
}

type StateObj = {
    accountStatus: any
}


const Login: FC = () => {


    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState<Input>({
        InputValue: {}
    });
    const [response, setResponse] = useState<any>({});
    const [loader, setLoader] = useState(false);
    const [stateObj, setStateObj] = useState<StateObj>({
        accountStatus: null
    });
    const handleInput = (event: any) => {
        let {InputValue} = loginData;
        InputValue[event.nativeEvent.target.name] = event.nativeEvent.target.value;
        setLoginData({...loginData, InputValue});
    }

    const handleShowHidePassword = () => {
        if (!showPassword) {
            setShowPassword(true);
        } else {
            setShowPassword(false);
        }
    }

    const handleLogin = () => {
        setLoader(true);
        setStateObj({...stateObj, accountStatus: null});

    }

    const redirectToSignup = () => {
        navigate("/singup", {replace: true})
    }

    const handleShowLoginOption = () => {

    }

    return (
        <React.Fragment>

            <Stack marginTop={"12%"} justifyContent={"center"} display={"flex"} alignItems={"center"}>
                <Card color="neutral"
                      variant="outlined" sx={{
                    userSelect: 'none',
                    height: 400,
                    width: 700,
                    background: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(5px)',
                    "--Card-padding": "0px"
                }}>
                    <CardContent>
                        <Stack sx={{height: '100%'}} direction={"row"} spacing={1} alignItems={"center"}
                               display={"flex"} justifyContent={"space-between"}>
                            <Stack sx={{
                                width: '60%',
                                height: '100%',
                                background: '#EFFFF1',
                                paddingLeft: 2
                            }} justifyContent={"start"}>
                                <Stack direction={"row"} justifyContent={"left"} paddingTop={5}>
                                    <img src="ncinga_green.png" width={180} height={40}/>
                                </Stack>
                                <Stack direction={"column"} justifyContent={"center"} alignItems={"left"}
                                       marginTop={5}>
                                    <Typography style={{
                                        fontFamily: 'CustomUbuntu',
                                        fontSize: '1.4rem',
                                        color: 'black'
                                    }} level="title-lg">DocQuery</Typography>
                                    <Typography style={{
                                        fontFamily: 'CustomUbuntu',
                                        fontSize: '1.2rem'
                                    }}> Query your Banking</Typography>
                                    <Typography style={{
                                        fontFamily: 'CustomUbuntu',
                                        fontSize: '1.2rem'
                                    }}>Documents</Typography>
                                </Stack>
                                <Stack>
                                </Stack>

                            </Stack>
                            <Stack direction={"column"} spacing={1} sx={{height: '100%', padding: 2}}>
                                <Stack justifyContent={"center"} sx={{height: '100%'}}>
                                    <FormControl>
                                        <FormLabel>Email</FormLabel>
                                        <Input value={loginData.InputValue?.email} name={"email"} onChange={handleInput}
                                               placeholder={"Email"}
                                               type={"text"}
                                               startDecorator={<Person2RoundedIcon/>}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Password</FormLabel>
                                        <Input value={loginData.InputValue?.password} name={"password"}
                                               onChange={handleInput} placeholder={"Password"}
                                               type={showPassword ? "text" : "password"}
                                               startDecorator={<LockPersonRoundedIcon/>}
                                               endDecorator={<IconButton onClick={handleShowHidePassword}
                                                                         variant="solid" color={"primary"}>
                                                   {showPassword ? <VisibilityOffRoundedIcon/> :
                                                       <VisibilityRoundedIcon/>}
                                               </IconButton>}
                                        />
                                    </FormControl>
                                    <Stack direction={"row"} justifyContent={"end"} paddingTop={1}>
                                        <Typography onClick={handleShowLoginOption} style={{
                                            fontFamily: 'CustomUbuntu',
                                            fontSize: '0.9rem',
                                            color: '#06AC2E',
                                            cursor: 'pointer'
                                        }} level="title-lg">Forget my password</Typography>
                                    </Stack>

                                    <Stack spacing={1} direction={"column"} sx={{marginTop: 3}}>
                                        {response.code === "LOGIN_ERROR" &&
                                            <Alert color={"danger"} size="sm">{response?.error}</Alert>}
                                        {stateObj.accountStatus !== null &&
                                            <Alert color={"warning"} size="sm">{stateObj?.accountStatus}</Alert>}
                                        <Button
                                            disabled={loginData.InputValue?.email == "" ? true : false || loginData.InputValue?.password == "" ? true : false}
                                            loading={loader ? true : false}
                                            onClick={handleLogin}
                                            color="primary">
                                            Login
                                        </Button>
                                        <Stack direction={"row"} justifyContent={"end"} spacing={1}
                                               alignItems={"center"}>
                                            <Typography style={{
                                                fontFamily: 'CustomUbuntu',
                                                fontSize: '0.9rem'
                                            }}>Don't have an account yet? </Typography>
                                            <Typography onClick={redirectToSignup} style={{
                                                cursor: 'pointer',
                                                fontFamily: 'CustomUbuntu',
                                                fontSize: '1rem',
                                                color: '#06AC2E'
                                            }} level="title-lg">Sing Up</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack direction={"row"} justifyContent={"center"} spacing={1}>
                                    <Typography style={{
                                        fontFamily: 'CustomUbuntu',
                                        fontSize: '0.9rem'
                                    }}>© 2023 NCINGA</Typography>
                                </Stack>
                            </Stack>

                        </Stack>
                    </CardContent>
                </Card>
            </Stack>

        </React.Fragment>
    );
}

export default Login;
