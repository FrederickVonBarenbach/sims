function setup () {
  loadAssets ()
  createCanvas (w, h)
  frameRate (60)
  background ('black')
}

function draw () {
  background ('black')
  cameraMovement()
  /*for (t = 0; t < timestep; t++) {
  //Allows us to pause the simulation
  }*/
  for (i = 0; i < satellites.length; i++) {
    satellites[i].display()
  }
  push()
  fill(255)
  translate (w/2+(0-camX)*z, h/2+(0+camY)*z)
  circle(0, 0, 2*r_e*z)
  pop()
}

function mousePressed () {
  mouseClick = true
}

function mouseReleased () {
  mouseClick = false
}

function keyPressed () {
  if (keyCode == 38) {
    satellites[0].velocity[1] += 200
  } else if (keyCode == 40) {
    satellites[0].velocity[1] -= 200
  }
  if (keyCode == 39) {
    satellites[0].velocity[0] += 200
  } else if (keyCode == 37) {
    satellites[0].velocity[0] -= 200
  }

  if (keyCode == 87) {
    upDown = 1
    followID = undefined
  } else if (keyCode == 83) {
    downDown = 1
  }
  if (keyCode == 68) {
    rightDown = 1
  } else if (keyCode == 65) {
    leftDown = 1
  }
  if (keyCode == 17) {
    raiseDown = 1
  } else if (keyCode == 16) {
    lowerDown = 1
  }
}

function keyReleased () {
  if (keyCode == 87) {
    upDown = 0
  } else if (keyCode == 83) {
    downDown = 0
  }
  if (keyCode == 68) {
    rightDown = 0
  } else if (keyCode == 65) {
    leftDown = 0
  }
  if (keyCode == 17) {
    raiseDown = 0
  } else if (keyCode == 16) {
    lowerDown = 0
  }
}

function cameraMovement () {
  if (upDown) {
    camY += camSpeed/z
  } else if (downDown) {
    camY -= camSpeed/z
  }
  if (leftDown) {
    camX -= camSpeed/z
  } else if (rightDown) {
    camX += camSpeed/z
  }
  if (lowerDown && z < 10000 && z > 0) {
    z = w*z/(w-camSpeed)
  } else if (raiseDown) {
    z = w*z/(w+camSpeed)
  }
}

function satellite (velocity, position) {
  this.velocity = velocity
  this.position = position
  this.a = 0
  this.b = 0
  this.k = 0
  this.c = 0
  this.velocity_

  this.orbit = function () {
    //0,0 is position of Earth
    r_vec = [this.position[0]-0, this.position[1]-0]
    //Calculation of specific angular momentum
    r = Math.sqrt(Math.pow(r_vec[0],2)+Math.pow(r_vec[1],2))
    v = Math.sqrt(Math.pow(this.velocity[0],2)+Math.pow(this.velocity[1],2))
    l_ = Math.abs(r_vec[0]*this.velocity[1]-r_vec[1]*this.velocity[0])
    l = Math.pow(l_,2)/(g*m_e)

    this.a = -1/((Math.pow(v,2))/(g*m_e)-2/r)
    aphe = (-2-Math.sqrt(Math.pow(2,2)-4*l/this.a))/(-2/this.a)
    perihe = (-2+Math.sqrt(Math.pow(2,2)-4*l/this.a))/(-2/this.a)
    e = Math.sqrt(1-(perihe*aphe)/(Math.pow(this.a,2)))
    this.b = Math.sqrt(aphe*perihe)
    c_ = ((this.a*(1-Math.pow(e,2)))/(r)-1)/(e)
    if (c_ > 1) {
      c_ = 1
    } else if (c_ < -1) {
      c_ = -1
    }

    /*if (r_vec[1] > 1) {
        c_ = Math.acos(c_)*Math.sign(this.position[0]*this.position[1])
    } else {
        c_ = -Math.acos(c_)*Math.sign(this.position[0]*this.position[1])
    }
    if (r_vec[0]*this.velocity[0]+r_vec[1]*this.velocity[1] > 0) {
      c_=-c_
    }
    if (this.position[0] < 0) {
      this.c = c_-Math.atan(r_vec[1]/r_vec[0])-PI
    } else {
      this.c = c_-Math.atan(r_vec[1]/r_vec[0])
    }*/
    //Angles is normalized here as a rotation in the CCW direction

    if (this.position[0] >= 0) {
      c0 = Math.atan(r_vec[1]/r_vec[0])
    } else if (this.position[0] < 0) {
      c0 = PI+Math.atan(r_vec[1]/r_vec[0])
    }
    cScale = (r_vec[0]*this.velocity[0]*-Math.sign(this.velocity[1]*Math.cos(-c0)+this.velocity[0]*Math.sin(-c0))
            + r_vec[1]*this.velocity[1]*Math.sign(this.velocity[1]*Math.cos(-c0)+this.velocity[0]*Math.sin(-c0)))
    if (cScale < 0) {
      c_=-Math.acos(c_)
    } else if (cScale >= 0) {
      c_=Math.acos(c_)
    }

    //print (c_)
    //print (c0)
    this.c = c0-c_
    this.k = aphe-this.a
  }

  this.display = function () {
    if (this.velocity_ != this.velocity) {
      this.orbit()
      //this.velocity_ = this.velocity
    }
    push()
    stroke(255)
    translate(w/2+(0-camX)*z, h/2+(0+camY)*z)
    line((this.position[0])*z,(-this.position[1])*z,(this.position[0]+this.velocity[0]*400)*z, (-this.position[1]-this.velocity[1]*400)*z)
    circle(this.position[0]*z,-this.position[1]*z, 10)
    rotate(-this.c)
    noFill()
    ellipse(-this.k*z, 0, 2*this.a*z, 2*this.b*z)
    pop()
  }
}
