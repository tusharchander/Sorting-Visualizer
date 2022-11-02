import React,{useState,useLayoutEffect,useRef} from 'react'
import './sorting_visualizer.css'
import * as SortingAlgo from './sortingAlgo/SortingAlgo';
const SortingVisualization = () => {

    const [speed,setspeed]=useState(10);
    const [algo,setAlgo]=useState('bubbleSort');
    const [blockHeight,setblockHeight]=useState();
    const [height,setheight]=useState();
    const [width,setwidth]=useState();
    const [min,setMin]=useState();
    const [max,setMAx]=useState();
    const [size,setsize]=useState(50);
    const [sorting,setsorting]=useState(false)
    const bh=width/size;
    // setblockHeight(width/size);
    // Main height

    const ref=useRef(null);

    // array
    const [array, setarray] = useState([])
    const [sortedArray,setSortedArray]=useState([])
    const randomNum=(min,max)=>{
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const resetArray=(height)=>{  
        if(sorting)return;
        const array=[];let min=1000;let max=0;
        resetArrayColor()
        for (let i=0;i<size;i++){
            const x=randomNum(5,500);
            min=Math.min(min,x);
            max=Math.max(max,x);
            array.push(x);
        }
        const sortedArray=array.slice().sort((a,b)=>a-b);
        setSortedArray(sortedArray);
        const block_height=height/(max-min);
        setblockHeight(block_height)
        setarray(array);
        // setfound(true);

    }
    useLayoutEffect(() => {   
        const height=ref.current.offsetHeight;
        const width=ref.current.offsetWidth;
        if(width<=500){
            setMin(2);
            setMAx(50);
        }else if(width<=1000){
            setMin(4);
            setMAx(100);
        }else{
            setMin(10);
            setMAx(200);
        }
        setheight(height);
        setwidth(width);
        resetArray(height);
    }, [])

    const changeSize=(e)=>{
        if(sorting) return;
        const len=e.target.value;
        setsize(len);
        resetArray(height)
    }
    const changeSpeed=(e)=>{
        if(sorting)return;
        const delay=e.target.value;
        setspeed(21-delay);
    }

    // sorting algo
    const handleRun=()=>{
        // console.log(algo)
        if(algo==='bubbleSort') bubbleSort();
        else if(algo==='mergeSort')mergeSort();
        else if(algo==='insertionSort')insertionSort();
        else if(algo==='quickSort')quickSort();
        else selectionSort();
    }
    const handleAlgo=(e)=>{
        setAlgo(e.target.value);
    }
    const isEqual=(arr1,arr2)=>{
        if(arr1.length !==arr2.length)return false;
        for(let i=0;i<arr1.length;i++){
            if(arr1[i]!==arr2[i]){
                return false;
            }
        }
        return true;
    }

    const quickSort=()=>{
        if(isEqual(array,sortedArray))return;
        if (sorting)return;
        setsorting(true);
        const animations=SortingAlgo.quickSort(array);
        animate(animations)
    }
    const mergeSort=()=>{
        if(isEqual(array,sortedArray))return;
        if(sorting)return;
        setsorting(true);
        const animations=SortingAlgo.mergeSort(array);
        animate(animations);
    }
    const insertionSort=()=>{
        if(isEqual(array,sortedArray))return;
        if(sorting)return;
        setsorting(true);
        const animations=SortingAlgo.insertionSort(array);
        animate(animations);
    }
    const bubbleSort=()=>{
        if(isEqual(array,sortedArray))return;
        if(sorting)return;
        setsorting(true);
        const animations=SortingAlgo.bubbleSort(array);
        animate(animations);
    }
    const selectionSort=()=>{
        if(isEqual(array,sortedArray))return;
        if(sorting)return;
        setsorting(true);
        const animations=SortingAlgo.selectionSort(array);
        animate(animations);
    }

    // animations
    const animate=(animations)=>{
        // console.log(animations.length);
        animations.forEach(([comparison,swapped],index)=> {
            setTimeout(() => {
                if(!swapped){
                    if(comparison.length===2){
                        const[i,j]=comparison;
                        animateArray(i);
                        animateArray(j);
                    }else{
                        const[i]=comparison;
                        animateArray(i);
                    }
                }else{
                    setarray((prev)=>{
                        const [k,value]=comparison;
                        const newArray=[...prev];
                        newArray[k]=value;
                        return newArray
                    });
                }
            }, index*speed);
        });
        setTimeout(() => {
            animateSortedArray();
        },  animations.length*speed);
    }
    const animateArray=(i)=>{
        const arrayBar=document.getElementsByClassName('array_bar')[i].style;
        setTimeout(() => {
            arrayBar.backgroundColor='red';
        }, speed);
        setTimeout(() => {
            arrayBar.backgroundColor='';
        }, speed*2);
    }
    const animateSortedArray=()=>{
        const arrayBar=document.getElementsByClassName('array_bar');
        for(let i=0;i<arrayBar.length;i++){
            setTimeout(() => {
                arrayBar[i].style.backgroundColor='green';
            }, i*speed);
            if(i===arrayBar.length-1)restoreButton();
        }
    }
    const restoreButton=()=>{
        setsorting(false);
    }
    const resetArrayColor=()=>{
        const arrayBar=document.getElementsByClassName('array_bar');
        for(let i=0;i<arrayBar.length;i++){
            arrayBar[i].style.backgroundColor='';
        }
    }
    return (
        <>
        <div className='container'>
            <div className='menu'>
                <div>
                    <span>Size:</span>
                    <input type="range" disabled={sorting} min={min} max={max}value={size} onChange={(e)=>changeSize(e)} />
                    <span>{size}</span>
                </div>
                <button className='button' disabled={sorting} onClick={()=>resetArray(height)}>Reset</button>
                {width>1091?
                <>
                    <button className='button' disabled={sorting} onClick={()=>mergeSort()}>margeSort</button>
                    <button className='button' disabled={sorting} onClick={()=>quickSort()}>quickSort</button>
                    <button className='button' disabled={sorting} onClick={()=>insertionSort()}>insertionSort</button>
                    <button  className='button' disabled={sorting} onClick={()=>bubbleSort()}>bubbleSort</button>
                    <button className='button' disabled={sorting} onClick={()=>selectionSort()}>selectionSort</button>
                </>:
                <>
                    <select onChange={(e)=>handleAlgo(e)} name="algo" id="" className='select'>
                    <option value="bubbleSort">Bubble Sort</option>
                    <option value="selectionSort">Selection Sort</option>
                    <option value="insertionSort">Insertion Sort</option>
                    <option value="quickSort">Quick Sort</option>
                    <option value="mergeSort">Merge Sort</option>
                    </select>
                    <button className='button' onClick={()=>handleRun()} disabled={sorting}>Run</button>
                
                </>
                }
                

               
                <div>
                    <span>Speed:</span>
                    <input type="range"min="1" disabled={sorting} max="20"value={21-speed} onChange={(e)=>changeSpeed(e)} />
                    <span>{21-speed}</span>
                </div>
                
            </div>
            <div ref={ref} className='array_container'>{
                    array.map((value,idx)=>{
                    return  <div className='array_bar' key={idx} style={{height:`${(blockHeight*value)}px`,width:`${(bh)}px`}}></div>
                    })
                }
            </div>
        </div>
           
        </>
    )
}

export default SortingVisualization