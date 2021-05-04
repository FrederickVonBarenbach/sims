function setup () {
  loadAssets ()
  createCanvas (w, h)
  frameRate (60)
  background ('black')
  totalCalc ()
  /*for (t = 0; t < 3; t++) {
    totalCalc ()
    populationDynamics ()
    print (populations)
  }*/
}

//To DO:
// - Selectivity
//    + genotype

//Calculate population dynamics every 3 seconds
function draw () {
  background ('black')
  cameraMovement()
  if (pause) {
    lastGen = millis() - timeElapsed
  }
  timeElapsed = millis() - lastGen

  if (timeElapsed > 1000) {
    print (true)
    totalCalc ()
    populationDynamics ()
    print (populations)
    lastGen = millis()
    gen++
  }

  displayGraph()
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
  if (keyCode == 32) {
    pause = !pause
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

function totalCalc () {
  totalPop = new population([],[])
  totalPop.total = [0,0]
  for (i = 0; i < populations.length; i++) {
    for (g = 0; g < 2; g++) {
      if (!totalPop.genes.includes(populations[i].genes[g])) {
        totalPop.genes.push(populations[i].genes[g])
        totalPop.number.push([populations[i].number[0], populations[i].number[1]])
      } else {
        //totalPop.genes.indexOf(populations[i].genes[g]) is searching for an
        //allele within the list of all alleles present in the population
        //(g means either allele 1 or 2 at the particular locus)
        //This is used because totalPop.number corresponds to the allele
        //(so that we have a number of M and F that have each allele)
        totalPop.number[totalPop.genes.indexOf(populations[i].genes[g])][0] += populations[i].number[0]
        totalPop.number[totalPop.genes.indexOf(populations[i].genes[g])][1] += populations[i].number[1]
      }
    }
    totalPop.total[0] += populations[i].number[0]
    totalPop.total[1] += populations[i].number[1]
  }
}

function populationDynamics () {
  //Reproduction
  p = []
  p_=[0,0]
   //Number of total offspring depends on the number of females and males
   //For example: 2 Males and 1 Female have 1*birthRate offspring
  n = birthRate*(totalPop.total[0]+totalPop.total[1] -
                 Math.abs(totalPop.total[0]-totalPop.total[1]))

  //Probability calculations
  for (i = 0; i < totalPop.genes.length; i++) {
    if (rand) {
      randRange = ((0.8)+Math.random()*(1.2-0.8)) //Changes the actual vs expected number
    } else {                                      //of individuals in the range [0.8-1.2]
      randRange = 1
    }
    pM = (totalPop.number[i][0]/(totalPop.total[0]*2))*randRange
    pF = (totalPop.number[i][1]/(totalPop.total[1]*2))*randRange
    if (p_[0]+pM > 1 || i == totalPop.genes.length-1) {
      pM = 1-p_[0]
    }
    if (p_[1]+pF > 1 || i == totalPop.genes.length-1) {
      pF = 1-p_[1]
    }
    p_=[p_[0]+pM, p_[1]+pF]
    p.push([pM,pF])
  }

  //Generation Population Calculations
  skip = [] //This is so we don't have two heterozygote memes
  populations = []
  for (a = 0; a < totalPop.genes.length; a++) {
    for (b = 0; b < totalPop.genes.length; b++) {
      if (skip.includes(a+''+b)) continue
      if (rand) {
        ratio = (0.4+Math.random()*(0.6-0.4)) //Ratio of both male to female offspring
      } else {                                //in the range [0.4-0.6]
        ratio = 0.5
      }

      if (totalPop.genes[a] != totalPop.genes[b]) {
        skip.push(b+''+a)
        //The probabilities for heterozygotes are slightly more difficult
        //this is because females and males have different allele frequencies
        //For example: For AA, we can think of it as Female A/Male A
        //             (Male A/Female A is the same thing)
        //             However, for AB, for example, we have Female A/Male B or
        //             Male A/Female B so we can't just do X2 because it depends
        //             on the number of females with allele and the number of
        //             males with the allele (it's more complex
        nM = Math.round((p[a][0]*p[b][1]+p[a][1]*p[b][0])*n*ratio)
        nF = Math.round((p[a][0]*p[b][1]+p[a][1]*p[b][0])*n*(1-ratio))
      } else {
        nM = Math.round(p[a][0]*p[b][1]*n*ratio)
        nF = Math.round(p[a][0]*p[b][1]*n*(1-ratio))
      }
      populations.push(new population([totalPop.genes[a],totalPop.genes[b]],
                                      [nM,nF]))
    }
  }
}

function displayGraph () {
  l = w/(populations.length+1)
  populations.forEach((pop,i) => {
    fill ('white')
    r = (pop.total/(totalPop.total[0]+totalPop.total[1]))
    x = l*(i+1)-20
    rect(x, h, -40, -r*(h*0.8))
    text(("Genotype: " + pop.genes[0] + pop.genes[1]), x, (h-r*(h*0.8))-10)
  })
  textSize(30)
  text((totalPop.total[0]+totalPop.total[1]), 10, 30)
  text(("Generation: " + gen), 10, 70)
}

function population (genes, number) {
  this.genes = genes //[geneA, geneB]
  this.number = number //[M, F]
  this.total = number[0]+number[1]
}
