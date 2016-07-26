import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'
import _ from 'lodash'

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const YOUTUBE_API_KEY = 'AIzaSyDKEOKLZYDDgPqdi-HNOH9xPP0PSfRFoPY';


class App extends Component {
	constructor(props){
		super(props);
		this.state = { 
			videos :[], 
			selectedVideo: null 
		}
		this.videoSearch('kabali');
	}

	videoSearch(term) {
		YTSearch({key: YOUTUBE_API_KEY, term : term},  (videos) => {
			 //console.log(videos);
			 this.setState({ videos: videos,
			 				selectedVideo: videos[0] });
			
			});
	}


	render () {
		const videoSearch =  _.debounce((term) => { this.videoSearch(term)}, 300)
		return (
		<div>
			<SearchBar onSearchTermChange={videoSearch}/>
			<VideoDetail video={this.state.selectedVideo}/>
			<VideoList 
				onVideoSelect={selectedVideo => this.setState({selectedVideo})}
				videos={this.state.videos}
				/>
		</div>
		);
 	}
}
ReactDOM.render(<App /> , document.querySelector('.container'));
