Song= ""
Song1= ""
leftWrist_x = ""
leftWrist_y = ""
rightWrist_x = ""
rightWrist_y = ""
leftWrist_score = ""
rightWrist_score = ""
function preload() {
Song=loadSound("music.mp3")
Song1=loadSound("music2.mp3")    
}
function setup() {
    canvas=createCanvas(300,300)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    Posenet=ml5.poseNet(video,model_loaded)
    Posenet.on("pose",getPoses)
}
function model_loaded() {
    console.log("Model_load_completed")
}
function play() {
    Song.play()
}
function pause() {
    Song.pause()
}
function stop() {
    Song.stop()
}
function getPoses(Results) {
    if (Results.length>0) {
        console.log(Results)
        leftWrist_x = Results[0].pose.leftWrist.x
        leftWrist_y = Results[0].pose.leftWrist.y
        rightWrist_x = Results[0].pose.rightWrist.x
        rightWrist_y = Results[0].pose.rightWrist.y
        console.log(leftWrist_x, leftWrist_y, rightWrist_x, rightWrist_y)
        leftWrist_score = Results[0].pose.keypoints[9].score
        console.log(leftWrist_score)
        rightWrist_score = Results[0].pose.keypoints[10].score
        console.log(rightWrist_score)
    }
}
function draw() {
    image(video,0,0,300,300)
    fill("blue")
    stroke("azure")
    if (leftWrist_score>0.2) {
        circle(leftWrist_x,leftWrist_y,20)
        Song.stop()
        if (Song1.isPlaying()==false) {
            Song1.play()
            document.getElementById("holder").innerHTML="Playing Song 1"
        }
        
    }
    if (rightWrist_score>0.2) {
        circle(rightWrist_x,rightWrist_y,20)
        Song1.stop()
        if (Song.isPlaying()==false) {
            Song.play()
            document.getElementById("holder").innerHTML="Playing Song 2"
        }
        
    }
    }