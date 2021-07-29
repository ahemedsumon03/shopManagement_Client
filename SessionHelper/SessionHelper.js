class SessionHelper{
    static setUserName(value)
    {
        sessionStorage.setItem('username',value);
    }

    static getUserName()
    {
        return sessionStorage.getItem('username');
    }

    static removeUserName()
    {
        return sessionStorage.removeItem('username');
    }
}

export default SessionHelper;