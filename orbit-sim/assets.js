function loadAssets () {
  w = 1200
  h = 768
  g = 1.2*Math.pow(10,-5)
  //distance is in millions of km
  //mass is in Earth masses
  //

  n_bodies = 100
  bodies = []

  timestep = 1
  pause = false

  camX = 0
  camY = 0
  z = 1
  camSpeed = 10
  followID = undefined

  upDown = false
  downDown = false
  leftDown = false
  rightDown = false
  raiseDown = false
  lowerDown = false
  mouseClick = false

  bodies.push(new body(330000, 0.7, 0, 0, 0, 0, 30))
  bodies.push(new body(0.05, 0.002, 58, 0, 0, 0, 1.5))
  bodies.push(new body(0.8, 0.006, 110, 0, 0, 0, 2))
  bodies.push(new body(1, 0.006, 150, 0, 0, 0, 2))
  bodies.push(new body(0.1, 0.003, 230, 0, 0, 0, 1.5))
  bodies.push(new body(320, 0.07, 780, 0, 0, 0, 10))
  bodies.push(new body(95, 0.06, 1430, 0, 0, 0, 8))
  bodies.push(new body(15, 0.02, 2870, 0, 0, 0, 4))
  bodies.push(new body(1.7, 0.02, 4500, 0, 0, 0, 4))

  /*for (i = 0; i < n_bodies; i++) {
    //Math.random()*(MAX-MIN)+MIN
    _mass = Math.random()*(20-3)+3
    if (_mass*3/4 > 3) {
      _radius = Math.random()*(_mass-_mass*3/4)+_mass*3/4
    } else {
      _radius = Math.random()*(_mass-3)+3
    }
    //This if statement ensures that there are no bodies with radii smaller
    //than a radius of 2
    _x = Math.random()*(1000+1000)-1000
    _y = Math.random()*(1000+1000)-1000
    _vx = Math.random()*(3+3)-3
    _vy = Math.random()*(3+3)-3

    bodies.push(new body(_mass, _radius, _x, _y, _vx, _vy))
  }*/

  //The reason we use 1 instead of 0 is because we don't want the Sun orbiting the Sun
  for (i = 1; i < bodies.length; i++) {
    //The code below is for perfectly circular orbits
    r = Math.sqrt(Math.pow(bodies[0].x-bodies[i].x,2)+Math.pow(bodies[0].y-bodies[i].y,2))
    v = Math.sqrt(g*bodies[0].mass*(2/r-1/r))
    //We set a to r since we want circular orbit
    bodies[i].vx = v*-(bodies[0].y-bodies[i].y)/r
    bodies[i].vy = v*(bodies[0].x-bodies[i].x)/r
  }
}
