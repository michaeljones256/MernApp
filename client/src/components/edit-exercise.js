import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams, withRouter } from "react-router-dom";


const EditExercise = () => {

  const{id} = useParams();
  const[username, setUsername] = useState('')
  const[description, setDescription] = useState('')
  const[duration, setDuration] = useState(0)
  const[date, setDate] = useState(new Date())
  
  const[users,setUsers] = useState([])
  

  useEffect(() => {
    let mounted = true;

    
    axios.get('http://localhost:5000/exercises/'+id)
    .then(response => {
      if(mounted){
        setUsername(response.data.username)
        setDescription(response.data.description)
        setDuration(response.data.duration)
        setDate(new Date(response.data.date)) 
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    axios.get('http://localhost:5000/users/')
    .then(response => {
      if (response.data.length > 0) {
        if(mounted){
          setUsers(response.data.map(user => user.username))
          
        }
      }
    })
    .catch((error) => {
      console.log(error);
    })
    
    
    

    return () => mounted = false;
  },[]);

  const logName = (e) => {

    // prevent the page from re rendering 
    e.preventDefault();
    console.log(username)
    console.log(duration)
    console.log(date)
    console.log(description)

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';

  };

  const handleDescriptionInput = e => {
    setDescription(e.target.value);
  }
  const handleUserNameInput = e => {
    setUsername(e.target.value);
  }
  const handleDurationInput = e => {
    setDuration(e.target.value);
  }
  const handleDateInput = date => {
    setDate(date);
  }


  const userInput = React.useRef()

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={logName}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref={userInput}
              required
              className="form-control"
              value={username}
              onChange={handleUserNameInput}>
              {
                users.map(user=> (
                  <option key={user} value={user}>
                      {user}
                  </option>
                ))
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={description}
              onChange={handleDescriptionInput}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={duration}
              onChange={handleDurationInput}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={handleDateInput}
            />
          </div>
        </div>
        <br/>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  

};
export default EditExercise;

/*
class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
export default withRouter(EditExercise)*/