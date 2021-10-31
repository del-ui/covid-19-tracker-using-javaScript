document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];
    let scoreDisplay = document.getElementById("score");
    let score = 0;
    const candyColors = [
        'url(images/red-candy.png)',
        'url(images/yellow-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/green-candy.png)',
        'url(images/blue-candy.png)'
    ]

    // create Board
    let createBoard = () => {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('draggable', true);
            square.setAttribute('id', i);
            let randomColor = Math.floor(Math.random() * candyColors.length);
            square.style.backgroundImage = candyColors[randomColor];
            grid.appendChild(square);
            squares.push(square);
        }
    }

    createBoard();
    //drag the candies
    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeindReplaced;
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('dragdrop', dragDrop))


    function dragStart() {
        colorBeingDragged = this.style.backgroundImage;
        squareIdBeingDragged = parseInt(this.id);
        console.log(colorBeingDragged);
        console.log(this.id, 'dragstart');
    }

    function dragOver(e) {
        e.preventDefault();
        console.log(this.id, 'dragover');
    }

    function dragEnter(e) {
        e.preventDefault();
        console.log(this.id, 'dragenter');
    }

    function dragLeave() {
        console.log(this.id, 'dragleave');
    }

    function dragDrop() {
        console.log(this.id, 'dragdrop');
        colorBeingReplaced = this.style.backgroundImage;
        squareIdBeindReplaced = parseInt(this.id);
        this.style.backgroundImage = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    }

    function dragEnd() {
        console.log(this.id, 'dragend');
        //what is a valid move
        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width
        ]


        let validMove = validMoves.includes(squareIdBeindReplaced);
        if (squareIdBeindReplaced && validMove) {
            squareIdBeindReplaced = null;
        } else if (squareIdBeindReplaced && !validMove) {
            squares[squareIdBeindReplaced].style.backgroundImage = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
        } else {
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
        }
    }

    const checkRowForThree = () => {
        for (i = 0; 1 < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === '';
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
            if (notValid.includes(i)) continue;
            if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3;
                scoreDisplay.innerHTML = score;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = '';
                })
            }
        }
    }
    checkRowForThree();

    const checkColumnForThree = () => {
        for (i = 0; 1 < 47; i++) {
            let columnOfThree = [i, i + width, i + width * 2];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === '';
            if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3;
                scoreDisplay.innerHTML = score;
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = '';
                })
            }
        }
    }
    checkColumnForThree();

    function moveDown() {
        for (i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundImage === '') {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
                squares[i].style.backgroundImage = '';
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
                let isFirstRow = firstRow.includes(i);
                if (isFirstRow && squares[1].style.backgroundImage === '') {
                    let randomColor = Math.floor(Math.random() * candyColors.length);
                    squares[1].style.backgroundImage = candyColors[randomColor];
                }
            }
        }
    }

    window.setInterval(() => {
        moveDown();
        checkRowForThree();
        checkColumnForThree();
    }, 100);

})