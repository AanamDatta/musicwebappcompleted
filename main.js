song1 = ""
song2 = ""
rightwristX = 0
rightwristY = 0 
leftwristX = 0
leftwristY = 0
scoreleftwrist = 0 
scorerightwrist = 0 
song1status = ""
song2status = ""
function setup() {
    canvas = createCanvas(600,500)
    canvas.position(500,150)
    video = createCapture(VIDEO)
    video.hide()
    classifier = ml5.poseNet(video, modeloaded) 
    classifier.on("pose",gotresult)

    }
    function modeloaded(){
        console.log("model is loaded")
     }
   
        
    
    function preload(){
        song1 = loadSound("09-Peter_Pan-Victory_song.mp3")
      
        song2 = loadSound("Harry Potter Theme Song.mp3")
    }
function gotresult( results){
    if (results.length>0) {
     
        console.log(results)
       
            leftwristX = results[0].pose.leftWrist.x
            leftwristY = results[0].pose.leftWrist.y
            rightwristX = results[0].pose.rightWrist.x
            rightwristY = results[0].pose.rightWrist.y
            console.log(results)
            scoreleftwrist = results[0].pose.keypoints[9].score;
            scorerightwrist = results[0].pose.keypoints[10].score;
        
    }
    
     }
     function draw() {
        image(video,0,0,600,500 )
        fill("red")
        song1status = song1.isPlaying()
        song2status = song2.isPlaying()
        if (scoreleftwrist > 0.2) {
            song2.stop()
            circle(leftwristX , leftwristY , 10)
if (song1status==false) {
    song1.play()
    document.getElementById("status").innerHTML = "Peter Pan song is Playing"
    song1.setVolume(1)
}
        }
        if (scorerightwrist > 0.2) {
            song1.stop()
            circle(rightwristX , rightwristY , 10)
            if (song2status==false) {
                song2.play()
                document.getElementById("status").innerHTML = "Harry Potter Theme song is Playing"
                song2.setVolume(1)
            }
        }

    }