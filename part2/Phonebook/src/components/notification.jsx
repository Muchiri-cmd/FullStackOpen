const Notification = ({message,error}) => {
    const msgBoxStyles = {
      color: 'green',
      fontSize: '13px',
      backgroundColor: 'whitesmoke',
      borderRadius: '8px',
      height: 'auto',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
      marginBottom: '20px',
      border: '1px solid green',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      maxWidth: '500px'
    } 
    const errorBoxStyles = {
      ...msgBoxStyles,
      color:'red',
      border:'1px solid red'
    }
    if (message === null && error === null)return null
    if (message !== null){
      return(
        <div className="msgBox" style={msgBoxStyles}>
          {message}
        </div>
      )
    } else if (error !== null){
      return(
        <div className="errBox" style={errorBoxStyles}>
          {error}
        </div>
      )
    }
}

export default Notification