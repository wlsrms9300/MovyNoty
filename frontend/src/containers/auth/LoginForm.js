//Redux(Store)와 연결하는 Containers
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { withRouter } from 'react-router-dom';
import { check } from '../../modules/user';

//useSelect은 state를 전달, dispatch는 action(setState)를 전달해준다
const LoginForm = ({history}) => {
    const [error, setError]  = useState(null);
    const dispatch = useDispatch();
    const {form,auth,authError,user} = useSelector(({auth,user})=>({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));
    const onChange = e=>{
        const {value, name} = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        )
    };
    const onSubmit =e=>{
        e.preventDefault();
        const {username, password} = form;
        dispatch(login({username, password}));
    }
    //첫 랜더링 초기화
    useEffect(()=>{
        dispatch(initializeForm('login'));
    },[dispatch])

    useEffect(() => {
        if (authError) {
          console.log('autherror');
          console.log(authError);
          setError('로그인 실패');
          return;
        }
        if (auth) {
          console.log('로그인성공');
          console.log(auth);
          dispatch(check());
        }
      }, [auth, authError, dispatch]);
    
    useEffect(() => {
    if (user) {
        history.push('/');
        try {
            localStorage.setItem('user',JSON.stringify(user));
        } catch (error) {
            console.log('not working');
        }
    }
    }, [history, user]);

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(LoginForm);