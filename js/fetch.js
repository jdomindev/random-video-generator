require('dotenv').config();

const apiKey = process.env.API_KEY



const fetch = async () => {
    const videos = document.getElementById('videos')
    const video = document.getElementById('video')
    const subVideo = document.getElementById('sub-video')

    const searchVideo = async () => {

        try {
            const search = document.getElementById('search').value
            videoSearch(apiKey, search)
            document.getElementById('search').value = ""
            document.getElementById('search').placeholder = search
            return newVideoList
        }
        catch {
            (error => console.log(error))
        }
    }
    searchVideo()

    const videoSearch = async (apiKey, search) => {
        let videoIds = []

        try {
            const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=5&q=${search}`)
            const jsonData = await response.json()
            jsonData.items.forEach(item => videoIds.push(item.id.videoId))
            console.log(videoIds)
            const videoList = await videoDuration(apiKey, videoIds)
            return videoList
        }
        catch {
            (error => console.log(error))
        }
    }

    const videoDuration = async (apiKey, videoIds) => {
        let videoList = []
        try {
            const urlVideos = videoIds.join(',')
            console.log(urlVideos)
            const url = `https://www.googleapis.com/youtube/v3/videos?id=${urlVideos}&part=contentDetails&key=${apiKey}`
            console.log(url)
            const response = await fetch(url)
            console.log(response)
            const jsonData = await response.json()
            jsonData.items.forEach(item => {
                // if (item.duration < 10) {
                videoList.push(item.id)
                // }
            })
            console.log(videoList)

            showVideo(videoList)
        }
        catch {
            error => console.log(error)
        }
    }

    const showVideo = (videoList) => {
        // create one main card dynamically here
        video.src = `https://www.youtube.com/embed/${videoList[0]}`
        // for (let i = 1; i < videoList.length; i++) {
            // create multiple sub cards here
            subVideo.src = `https://www.youtube.com/embed/${videoList[1]}`
        // }
        
    }
}

module.exports = fetch()

// first search for term
// term + duration
// array of videos 
// function to set videos up

// http://www.youtube.com/embed/${item.id.videoId}