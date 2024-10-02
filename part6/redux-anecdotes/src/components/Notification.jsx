import { useSelector } from "react-redux"

const Notification = () => {

  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom:20,
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification