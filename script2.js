
let ctrlIsPressed = false
let tiles = []
let mines = 0;
let gHeight = 0;
let gWidth = 0;
let toReveal = 0;

class Tile {
    //TODO
    //constructor method, set mined to false, height to y, width to x, number to 0, revealed to false, flagged to false
        
}
//TODO
//endGame function, msg as a parameter, set the msg elements inner html to equal the msg parameter
  //see document.getElementById
  
  
function tileClick(height,width){
    let tile = tiles[height][width]
    //if mined end game
    let loc = document.getElementById('l'+height+''+width)
    if(ctrlIsPressed){
        if(tile.flagged == false){
            tile.flagged = true
            loc.style.backgroundImage = "url('http://cliparting.com/wp-content/uploads/2016/07/Red-flag-clip-art-clipart.jpeg')"
            mines -= 1
            setMinesLeft(mines)
        }
        else{
            tile.flagged = false
            loc.style.backgroundImage = "url('')"
            mines += 1
            setMinesLeft(mines)
        }
    }
    else if(tile.flagged == false){
        if(tile.mined){
            loc.style.backgroundImage = "url('https://lh4.ggpht.com/d4ThZdKjGANziFu-sr_CElac-kjeZ2LbXeVRkTNk9RJhzb_4qFqGooCprBlalb3yLcgo=w300')"
            endGame('You Lose!')
        }
        else{
            reveal(tile)
        }
    }
}
document.addEventListener('keydown',function(event){
    if(event.which == '17') ctrlIsPressed = true
})
document.addEventListener('keyup',function(event){
    if(event.which == '17') ctrlIsPressed = false
})
//TODO
//setMinesLeft function, takes a count as the parameter.
  //set the mines to equal the count
  //make the minesLeft element to be equal to  the number of mines - document.getElementById


function createTiles(mines,height,width){
    let table = document.getElementById('game')
    //TODO write a for loop FOR i = 0 and i less than height, and i++
    {
        let row = document.createElement('tr')
        row.id = 'r'+i
        tiles[i] = []
        
        //TODO write a for loop FOR j = 0 and j less than width, and j++
        {
            let col = document.createElement('td')
            col.id = 'l'+i + '' +j
            tiles[i][j] = new Tile(j,i)
            row.appendChild(col)
            col.addEventListener('click', function(){
                tileClick(i,j)
            })
        }
        table.appendChild(row)
    }
    gHeight = height
    gWidth = width
    toReveal = height*width - mines
    setMinesLeft(mines)
    assignMines(mines,height,width)
}

let reveal = function(tile){
    if(tile.revealed == false){
        toReveal--
        if(toReveal == 0) endGame("You Win!")
        let loc = document.getElementById('l'+tile.height+''+tile.width)
        loc.innerHTML = tile.number
        tile.revealed = true;
        if(tile.number == 0 && tile.mined == false){
            revealAdjacent(tile.width,tile.height)
        }
    }
}
function revealAdjacent(height,width){
    //reveal adjacent tile  
    function sendToReveal(x,y){
        if(x >= 0 && x < gWidth && y >= 0 && y < gHeight){
            console.log(y,x,tiles[y][x])
             tileClick(y,x)
        }
    }
    //TODO
    //finish sendToReveal all the adjacent coordinates
    sendToReveal(height-1,width-1)
}
function assignMines(count,height,width){
  //randomly assign mines 'count' number of times
  let x = Math.floor(Math.random() * width)
  let y = Math.floor(Math.random() * height)
  let tile = tiles[y][x]
  if(tile.mined){
    assignMines(count,height,width)   

  } 
  else if(count > 0){
      tile.mined = true
      //increment adjacent mines
      let incrementNum = function(y,x){
          if(y >= 0 && y < height && x >= 0 && x < width) tiles[y][x].number++
      }
      incrementNum(y-1,x-1)
      incrementNum(y-1,x)
      incrementNum(y-1,x+1)
      incrementNum(y,x+1)
      incrementNum(y,x-1)
      incrementNum(y+1,x-1)
      incrementNum(y+1,x)
      incrementNum(y+1,x+1)
      assignMines(count-1,height,width) 
  }
}
createTiles(15,10,10)