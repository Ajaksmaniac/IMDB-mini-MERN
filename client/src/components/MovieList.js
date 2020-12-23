import React, {Component}from "react";
import {Card,Table,ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList,faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class MovieList extends Component{
    constructor(props) {
        super(props);
        this.state={
          movies:[],
          isAdmin: false
        };
    }

    componentDidMount() {
        this.findAllMovies();
        if(sessionStorage.getItem("isAdmin") === "true"){
            this.setState({isAdmin:true});
        }
    }
    componentWillUnmount(){
        this.findAllMovies();
    }


    findAllMovies(){
        axios.get("http://localhost:1337/api/movie/all")
            .then(response => response.data)
            .then((data) => {
           //     console.log(data);
                this.setState({movies:data})
            });
    }
    fetchDetails(a) {
        console.log(a.movie_id)
        this.props.history.push('page?id='+a.movie_id)
    }
    deleteMovie(id){
        axios.delete("http://localhost:1337/api/movie/delete/"+id)
        .then(response => response.data)
        .then((data) => {
            //this.setState({movies:data})
            window.location.reload(false);
            this.props.history.push('/list')
           
        });
        
    }

    render() {
        if(this.state.isAdmin === true) {
        return(

           <Card className="border border-dark bg-dark text-white">
               <Card.Header><FontAwesomeIcon icon={faList} />      Movie List</Card.Header>
               <Card.Body>
                   <Table bordered hover striped variant="dark">
                       <thead>
                       <tr>
                           <th>Name</th>
                           <th>Year of Release</th>
                           <th>Rating</th>
                           <th>Actions</th>
                       </tr>
                       </thead>
                       <tbody>
                       {this.state.movies.length === 0 ?
                           <tr align="center">
                               <td colSpan="6">{this.state.movies.length} Movies Available</td>

                           </tr> :
                           this.state.movies.map((movie) =>(
                                <tr key={movie.movie_id}  >

                                    <td onClick={() => this.fetchDetails(movie)}>
                                        
                                        {movie.name}
                                    </td>
                                    <td>{movie.dateOfRelease}</td>
                                    <td>{movie.rating}</td>

                                    <td>
                                        <ButtonGroup>
                                            <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>
                                            <Button size="sm" variant="outline-danger" onClick={() => this.deleteMovie(movie.movie_id)}><FontAwesomeIcon onClick={() => this.deleteMovie(movie.movie_id)} icon={faTrash} /></Button>
                                        </ButtonGroup>
                                    </td>


                                </tr>
                           ))
                       }
                       </tbody>
                   </Table>
               </Card.Body>
           </Card>
        );
    }else{
        return(

            <Card className="border border-dark bg-dark text-white">
                <Card.Header><FontAwesomeIcon icon={faList} />Book List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Year of Release</th>
                            <th>Rating</th>
                           
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.movies.length === 0 ?
                            <tr align="center">
                                <td colSpan="6">{this.state.movies.length} Movies Available</td>
 
                            </tr> :
                            this.state.movies.map((movie) =>(
                                 <tr key={movie.id}  onClick={() => this.fetchDetails(movie)}>
 
                                     <td>
                                         
                                         {movie.name}
                                     </td>
                                     <td>{movie.date_of_release}</td>
                                     <td>{movie.rating}</td>
 
                                   
 
 
                                 </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
         );
    }
    }
}
