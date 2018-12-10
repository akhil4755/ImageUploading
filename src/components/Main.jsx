import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
      images: [],

      file: null,
      alt_name: null,
      url : 'abcdefg' 
    };

  this.handleUploadImage = this.handleUploadImage.bind(this);
  }

handleUploadImage = (e) =>
{
  e.preventDefault();

    let img = [{
      file : this.state.file,
      alt_name : this.state.alt_name,
      img_url : 'aaaa',
    }]

    let flag=0;

    if(this.state.images.length === 0)
    {
      this.setState({images:img});
    }
    else 
    {
      let arr = this.state.images;

        for(let i=0; i<arr.length; i++)
        {
          if(arr[i].alt_name === this.state.alt_name )
          {
             arr[i].img_url = 'newurl';
             arr[i].file = this.state.file;
             this.setState({images:arr})
             flag = 1;
          }
        }
        if(flag === 0)
        {
          let imgarr = this.state.images;
          let concatedimagearray = imgarr.concat(img);
          this.setState({images:concatedimagearray})
        }
    }
}


handleSendUploadedImages = (ev) =>
{

  ev.preventDefault();

    const data = new FormData();
    let arr= this.state.images;

    arr.forEach((item, i) =>
    {
    data.append(`file${[i]}`, item.file);
    data.append(`alt_name${[i]}`, item.alt_name);
    data.append(`img_url${[i]}`, item.img_url);
    })
    data.append('url', this.state.url);

    fetch('http://localhost:3002/upload', {
      method: 'post',
      body: data
    })
    .then((response) => 
    {
      response.json().then((body) => 
      {
        this.setState({ imageURL: `http://localhost:3002/uploads/${body.file}` });
      });
    });
}

  render() {
    return (
      <form >
      {console.log(this.state.images)}
        <div>
          <input onChange={(e) => this.setState({file:e.target.files[0]})} type="file" />
        </div>
        <div>
            <select onChange={(e) => this.setState({alt_name:e.target.value})}>
              <option selected> Selected </option>
              <option>Background</option>
              <option>Cover</option>
              <option>ProfilePic</option>
            </select>
        </div>
        <button onClick={this.handleUploadImage}> Upload </button>
           <br />
           <br/>
        <div>
          <button onClick={this.handleSendUploadedImages} >Done !</button>
          <br/>
        </div>
        <img src={this.state.imageURL} alt="img" />
      </form>
    );
  }
}


export default Main;