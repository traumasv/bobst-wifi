import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'babel-polyfill';
import '/stylesheet.css'
import socket from 'socket.io-client';

console.log(process.env.NODE_ENV);
const postURL = process.env.NODE_ENV === "PRODUCTION" ? 'http://linserv1.cims.nyu.edu:27204' : 'http://localhost:3000';

const sock = socket(postURL);

class Query extends Component {
    constructor(props){
        super(props);
        this.state = {areas:['LL2', 'LL1', '1S', '2N', '2S', '2E', '2W', '3S', '3E', '3W','4N', '4S', '4E', '4W', '5S', '5E', '5W', '6N', '6W', '7S','7E', '7W', '8N', '8S', '8E', '8W', '9S', '9E', '9W', '10N', '10S', '10E', '10W']};
    }
    render() {
        return(
            <div>
                <select id="area-query" name="area">
                    {this.state.areas.map((area, index) => (
                        <option key={index} value={area}>{area}</option>
                    ))}
                </select>
                <input id="submit-query" type="submit" value='Search'/>
            </div>
        );
    }
}

class Poll extends Component {
    constructor(props){
        super(props);
        this.state = {areas:['LL2', 'LL1', '1S', '2N', '2S', '2E', '2W', '3S', '3E', '3W','4N', '4S', '4E', '4W', '5S', '5E', '5W', '6N', '6W', '7S','7E', '7W', '8N', '8S', '8E', '8W', '9S', '9E', '9W', '10N', '10S', '10E', '10W']};
    }
    render() {
        return(
            <div className="modal" id="poll">
                <h1>Where Are You? Are You Connected?</h1>
                <form action='/' method="POST">
                    <select id="area-select" name="area">
                        {this.state.areas.map(area => (
                            <option value={area}>{area}</option>
                        ))}
                    </select>

                    <select id="status-select" name="status">
                        <option value="1">{'👍'}</option>
                        <option value="0">{'👎'}</option>
                    </select>

                    <input type="submit" id="submit-poll" value="Submit"/>
                    <input type="button" id="close-poll" value="Cancel"/>
                </form>
            </div>
        );
    }   
}

class Status extends Component {
    constructor(props){
        super(props);
        this.state = {posts:[]};
        this.addNewPost = this.addNewPost.bind(this);
    }

    addNewPost(post){
        let temp = [post, ...this.state.posts];
        this.setState({posts: temp});
    }

    async componentDidMount(){

        sock.on('newPost', this.addNewPost);

        try{
            const posts = await $.ajax({
                method: 'GET',
                url: '/getposts',
                dataType: "json"
            });
            this.setState({posts:posts});
        }
        catch{
            console.log("Didn't get back JSON");
        }
    }
    render() {
        return(
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Time</th>
                        <th>Area</th>
                        <td>Status</td>
                    </tr>
                    {this.state.posts.map((post, index) => (
                        <tr class={post.area} key={index}>
                            <td>{post.time}</td>
                            <td>{post.area}</td>
                            <td>{post.status === 1 ? '👍' : '👎'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }


}

class Bobcat extends Component {
    constructor(props){
        super(props);
        this.state = {bobcat:''};
    }


    async componentDidMount(){
        try{
            const bobcat = await $.ajax({
                method: "GET",
                url: "/getbobcat",
            });
            this.setState({bobcat: bobcat});
        }
        catch{
            console.log('error getting bobcat...')
        }
    }

    render(){

        return(
            <div>
                <img src={this.state.bobcat}/>
            </div>
        );
    }
}

class App extends Component {

    render() {
        return (
        <div>
            <Bobcat />
            <h1>Bobst Internet Status</h1>
            <h2>Check Status by Area:</h2>
            <Query />
            <input id="open-poll" type="submit" value="Create Post"/>
            <Poll />
            <Status />
        </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

//Eventlistener for button to open form
document.getElementById('open-poll').addEventListener('click', function(){
    document.getElementById('poll').className = 'modal open';
});

//Eventlistener for button to submit form
document.getElementById('submit-poll').addEventListener('click', function(){
    //hiding the poll right away
    document.getElementById('poll').className = 'modal';
});

//Eventlistener for button to submit search
document.getElementById('submit-query').addEventListener('click', function(){
    //first, turn all the td table entries to 'none'
    const everything = document.getElementsByTagName('tr');
    const select = document.getElementById('area-query');
    console.log(everything);
    for (let i = 1; i < everything.length; i++){  
        if(everything[i].className !== select.options[select.selectedIndex].value){
            everything[i].style.display = 'none';
        }
        else{
            everything[i].style.display = 'block';
        }
    }
});

//Eventlistener to open the poll
document.getElementById('close-poll').addEventListener('click', function(){
    document.getElementById('poll').className = 'modal';
});