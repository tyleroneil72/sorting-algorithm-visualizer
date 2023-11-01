// Generate the elements based on the input
function generateElements(total) {
    let display = document.getElementById("display");

    for (let i = 0; i < total; i++) {
        let element = document.createElement("div");
        element.classList.add("element");
        display.appendChild(element);
    }
}

// Generate the heights and colours when randomizeHeights() is called
function generateRandomData() {
    let elements = document.getElementsByClassName("element");
    let colours = ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#9b59b6", "#27ae60", "#e67e22", "#1abc9c"];

    for (let i = 0; i < elements.length; i++) {
        let randomHeight = Math.floor(Math.random() * 150) + 50;
        let randomColour = colours[i % colours.length];
        elements[i].style.height = `${randomHeight}px`;
        elements[i].style.backgroundColor = randomColour;
    }
}

// Randomize the heights and colours when the "Randomize" button is clicked
function randomizeHeights() {
    clearMetrics();
    generateRandomData();
}

// Update the number of elements to the user defined number, between 1-30
function updateElements() {
    clearMetrics();
    let numElements = document.getElementById("numElements");

    if (numElements.value > 30) {
        numElements.value = 30;
    } else if (numElements.value < 1) {
        numElements.value = 1;
    }

    let display = document.getElementById("display");
    display.innerHTML = ""; // Clear previous elements
    generateElements(numElements.value);
    generateRandomData();
}

// Call the function to generate random heights and colors when the page loads
window.onload = function () {
    let numElements = document.getElementById("numElements").value;
    generateElements(numElements);
    generateRandomData();
};

// Function to calculate the performance metrics
function calculateMetrics(algorithmName, startTime, endTime) {
    const timeElapsed = (endTime - startTime).toFixed(4);;
    let timeComplexity;
    let spaceComplexity;

    if (algorithmName === 'Bubble Sort' || algorithmName === 'Selection Sort' || algorithmName === 'Insertion Sort') {
        timeComplexity = 'O(n<sup>2</sup>)';
        spaceComplexity = 'O(1)';
    } else if (algorithmName === "Heap Sort") {
        timeComplexity = 'O(n log n)'
        spaceComplexity = 'O(1)';
    } else if (algorithmName === "Quick Sort") {
        timeComplexity = 'O(n<sup>2</sup>)';
        spaceComplexity = 'O(log n)'
    } else {
        timeComplexity = 'Unknown';
        spaceComplexity = 'Unknown';
    }

    const metricsElement = document.getElementById('metrics');
    metricsElement.innerHTML = `
        <h3>Performance Metrics</h3>
        <p><strong>Algorithm:</strong> ${algorithmName}</p>
        <p><strong>Time Elapsed:</strong> ${timeElapsed} milliseconds</p>
        <p><strong>Time Complexity:</strong> ${timeComplexity}</p>
        <p><strong>Space Complexity:</strong> ${spaceComplexity}</p>
    `;
    metricsElement.style.opacity = 1;
}

// Bubble sort algorithm
async function bubbleSort() {
    clearMetrics();
    const startTime = performance.now();
    let elements = Array.from(document.getElementsByClassName("element"));
    let n = elements.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            let currentHeight = parseInt(elements[i].style.height);
            let nextHeight = parseInt(elements[i + 1].style.height);
            if (currentHeight > nextHeight) {
                await swap(elements, i, i + 1);
                swapped = true;
            }
        }
    } while (swapped);

    const endTime = performance.now();
    calculateMetrics('Bubble Sort', startTime, endTime);
}

// Selection sort algorithm
async function selectionSort() {
    clearMetrics();
    const startTime = performance.now();
    let elements = Array.from(document.getElementsByClassName("element"));
    let n = elements.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            let currentHeight = parseInt(elements[j].style.height);
            let minHeight = parseInt(elements[minIndex].style.height);
            if (currentHeight < minHeight) {
                minIndex = j;
            }
        }
        await swap(elements, i, minIndex);
    }
    const endTime = performance.now();
    calculateMetrics('Selection Sort', startTime, endTime);
}

// Insertion sort algorithm
async function insertionSort() {
    clearMetrics();
    const startTime = performance.now();
    let elements = Array.from(document.getElementsByClassName("element"));
    let n = elements.length;

    for (let i = 1; i < n; i++) {
        let key = parseInt(elements[i].style.height);
        let j = i - 1;
        while (j >= 0 && parseInt(elements[j].style.height) > key) {
            await swap(elements, j + 1, j);
            j = j - 1;
        }
    }

    const endTime = performance.now();
    calculateMetrics('Insertion Sort', startTime, endTime);
}

// Heap sort algorithm
async function heapSort() {
    clearMetrics();
    const startTime = performance.now();
    let elements = Array.from(document.getElementsByClassName("element"));
    let n = elements.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(elements, n, i);
    }

    // Heap sort
    for (let i = n - 1; i > 0; i--) {
        await swap(elements, 0, i);
        await heapify(elements, i, 0);
    }

    const endTime = performance.now();
    calculateMetrics('Heap Sort', startTime, endTime);
}

// Helper function for heap sort
async function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && parseInt(arr[left].style.height) > parseInt(arr[largest].style.height)) {
        largest = left;
    }

    if (right < n && parseInt(arr[right].style.height) > parseInt(arr[largest].style.height)) {
        largest = right;
    }

    if (largest !== i) {
        await swap(arr, i, largest);
        await heapify(arr, n, largest);
    }
}

// Quicksort algorithm
async function quickSort() {
    clearMetrics();
    const startTime = performance.now();
    let elements = Array.from(document.getElementsByClassName("element"));
    await quickSortRecursive(elements, 0, elements.length - 1);
    const endTime = performance.now();
    calculateMetrics('Quick Sort', startTime, endTime);
}

// Helper function for quick sort
async function quickSortRecursive(arr, left, right) {
    if (left < right) {
        let pivotIndex = await partition(arr, left, right);
        await quickSortRecursive(arr, left, pivotIndex - 1);
        await quickSortRecursive(arr, pivotIndex + 1, right);
    }
}

// Helper function for quick sort recursive function
async function partition(arr, left, right) {
    let pivot = parseInt(arr[right].style.height);
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (parseInt(arr[j].style.height) < pivot) {
            i++;
            await swap(arr, i, j);
        }
    }

    await swap(arr, i + 1, right);
    return i + 1;
}

// Helper function to swap elements with delay
async function swap(items, leftIndex, rightIndex) {
    let tempHeight = items[leftIndex].style.height;
    let tempColor = items[leftIndex].style.backgroundColor;

    // Adding the pointer class to the element being moved
    items[leftIndex].classList.add('moving');

    items[leftIndex].style.height = items[rightIndex].style.height;
    items[leftIndex].style.backgroundColor = items[rightIndex].style.backgroundColor;
    items[rightIndex].style.height = tempHeight;
    items[rightIndex].style.backgroundColor = tempColor;
    await sleep(100);

    // Removing the pointer class after the swap is complete
    items[leftIndex].classList.remove('moving');
}

// Helper function for delaying execution
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clearMetrics() {
    const metricsElement = document.getElementById('metrics');
    metricsElement.style.opacity = 0;
}
