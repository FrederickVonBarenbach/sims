function setup () {
  loadAssets ()
  createCanvas (w, h)
  frameRate (60)
  background ('black')
}

function draw () {
  background ('black')
  cameraMovement()
  for (i = 0; i < bodies.length; i++) {
    if (mouseClick) {
      if (bodies[i].radius*z < bodies[i].repRadius) {
        radius_ = bodies[i].repRadius
      } else {
        radius_ = bodies[i].radius*z
      }
      if (Math.sqrt(Math.pow(mouseX-(w/2+(bodies[i].x-camX)*z),2)
        + Math.pow(mouseY-(h/2+(-bodies[i].y+camY)*z),2)) <= radius_) {
         followID = i
         mouseClick = false
       } else {
         followID = undefined
       }
    }
    bodies[i].motion()
  }
  /*for (t = 0; t < timestep; t++) {
  //Allows us to pause the simulation

  }*/
}

function mousePressed () {
  mouseClick = true
}

function mouseReleased () {
  mouseClick = false
}

function keyPressed () {
  if (keyCode == 32) {
    pause = !pause
  }
  if (keyCode == 39) {
    timestep += 3
  } else if (keyCode == 37 && timestep > 1) {
    timestep  -= 3
  }

  if (keyCode == 87) {
    upDown = 1
    followID = undefined
  } else if (keyCode == 83) {
    downDown = 1
    followID = undefined
  }
  if (keyCode == 68) {
    rightDown = 1
    followID = undefined
  } else if (keyCode == 65) {
    leftDown = 1
    followID = undefined
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
  if (followID != undefined) {
    camX = bodies[followID].x
    camY = bodies[followID].y
    //Fixes camera on a specific body
  } else {
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
  }
  if (lowerDown && z < 10000 && z > 0) {
    z = w*z/(w-camSpeed)
  } else if (raiseDown) {
    z = w*z/(w+camSpeed)
  }
}

function body (mass, radius, x, y, vx, vy, repRadius) {
  this.mass = mass
  this.radius = radius
  this.x = x
  this.y = y
  this.vx = vx
  this.vy = vy
  this.repRadius = repRadius

  this.motion = function() {
    //This stored x is for the stroke
    x_ = this.x
    y_ = this.y
    if (!pause) {
      this.x += timestep*this.vx
      this.y += timestep*this.vy

      //We add our velocity to our position vector
      for (j = 0; j < bodies.length; j++) {
        if (bodies[j] == this) continue
        r = Math.sqrt(Math.pow(bodies[j].x-this.x,2)+Math.pow(bodies[j].y-this.y,2))
        f = (bodies[j].mass*g) / Math.pow(r,2)
        this.vx += timestep*f*(bodies[j].x-this.x)/r
        this.vy += timestep*f*(bodies[j].y-this.y)/r
        //We add our acceleration to our velocity vector
        col = this.collide(i, j, r)
        if (col == "COLLAPSE") {
          if (followID == i) {
            followID = undefined
          } else if (i < followID) {
            followID--
          }
          i--
          break
          //You must indeed add the j-- or i-- analysis given whether or not
          //the thing is before or after thing okay okay
        } else if (col == "EXPAND_more") {
          if (followID == j) {
            followID = undefined
          } else if (j < followID) {
            followID--
          }
          bodies[i].motion(j)
        } else if (col == "EXPAND_less") {
          if (followID == j) {
            followID = undefined
          } else if (j < followID) {
            followID--
          }
          i--
          bodies[i].motion(j)
          //I call bodies[i.motion because "this" is assigned to a completely
          //different variable ever since we reassigned it in new body (thing)
        }
        //The followID if statements here are designed to check whether the body
        //that is collapsing or expanding is the followed body and whether we
        //need to update our index value
      }
    }
    if (this.x*z > -w/2+(camX-radius*2)*z && this.x*z < w/2+(camX+radius*2)*z
     && this.y*z > -h/2+(camY-radius*2)*z && this.y*z < h/2+(camY+radius*2)*z) {
        noStroke()
        stroke(255)
        if (radius*z < repRadius) {
          strokeWeight(0)
          circle(w/2+(this.x-camX)*z, h/2+(-this.y+camY)*z, repRadius*2)
          strokeWeight(2*repRadius)
          line(w/2+(x_-camX)*z, h/2+(-y_+camY)*z, w/2+(this.x-camX)*z, h/2+(-this.y+camY)*z)
        } else {
          strokeWeight(0)
          circle(w/2+(this.x-camX)*z, h/2+(-this.y+camY)*z, radius*2*z)
          strokeWeight(2*radius*z)
          line(w/2+(x_-camX)*z, h/2+(-y_+camY)*z, w/2+(this.x-camX)*z, h/2+(-this.y+camY)*z)
        }
        //FOR RADIUS WE SHOULD USE ACTUAL RADIUS AND MULTIPLY IT BY THE ZOOM OUT interval
        //It should have real mechanics in the code and a visualization for the visualization (duh)

        //Here we declare that the diameter of the body is "10 times the mass",
        //is not necessarily true and we can always change it to a set diameter
    }
  }
  this.collide = function (n1, n2, r) {
    if (r <= (bodies[n1].radius+bodies[n2].radius)*0.8) {
      px = bodies[n1].mass*bodies[n1].vx+bodies[n2].mass*bodies[n2].vx
      py = bodies[n1].mass*bodies[n1].vy+bodies[n2].mass*bodies[n2].vy
      mass_ = bodies[n1].mass+bodies[n2].mass
      radius_ = Math.sqrt(Math.pow(bodies[n1].radius,2)+Math.pow(bodies[n2].radius,2))
      vx_ = px/(mass_)
      vy_ = py/(mass_)
      if (bodies[n1].mass > bodies[n2].mass) {
        bodies[n1] = new body(mass_, radius_, bodies[n1].x, bodies[n1].y, vx_, vy_)
        bodies.splice(n2,1)
        if (n1 < n2) {
          return ("EXPAND_more")
          //this just informs the program that a new mass will combine with
          //this mass and we must therefore shift our j value
        } else {
          return ("EXPAND_less")
          //this just informs the program that a new mass will combine with
          //this mass and we must therefore shift our i value and j value
        }
      } else {
        bodies[n2] = new body(mass_, radius_, bodies[n2].x, bodies[n2].y, vx_, vy_)
        bodies.splice(n1,1)
        return ("COLLAPSE")
      }
    }
  }
}
