import React, { Component } from 'react'

 class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="page-footer font-small " style={{backgroundColor:'rgb(43, 64, 85)'}}>


<div className="container">
  <div className="row">
    <div className="col-md-6 offset-3  mb-4">
      <div className=" text-center mt-4 ">

        <a href="https://www.facebook.com/profile.php?id=100019700986506" target="_blank" className="fb-ic">
          <i style={{color:'#4caf50 '}}  className="fa fa-facebook-square fa-lg white-text mr-md-5 mr-3 fa-2x">Facebook </i>
        </a>
       
     
        <a href="https://github.com/ChrisOsterback" target="_blank" className="git-ic">
          <i style={{color:'#4caf50 '}} className="fa fa-github-alt fa-lg  fa-2x">Github </i>
        </a>
      </div>
    </div>
    

  </div>
 

</div>

</footer>
            </div>
        )
    }
}

export default Footer;