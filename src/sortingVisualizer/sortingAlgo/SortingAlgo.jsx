export const  mergeSort=(arr)=>{
    const copy=[...arr];
    const len=arr.length;
    const aux=Array(len);
    const animations=[];
    mergeSortHepler(copy,aux,0,len-1,animations)
    return animations;
}
const mergeSortHepler=(arr,aux,l,r,animations)=>{
    if(l>=r)return;
    // console.log("yes");
    const mid=l+parseInt((r-l)/2);
    // console.log(mid);
    mergeSortHepler(arr,aux,l,mid,animations);
    mergeSortHepler(arr,aux,mid+1,r,animations);
    merge(arr,aux,l,mid,r,animations)
}
const merge=(arr,aux,l,mid,r,animations)=>{
    for(let i=l;i<=r;i++)aux[i]=arr[i];
    let i=l;let j=mid+1;
    for(let k=l;k<=r;k++){
        if(i>mid){
            animations.push([[j],false]);
            animations.push([[k,aux[j]],true]);
            arr[k]=aux[j++];
        }else if(j>r){
            animations.push([[i],false]);
            animations.push([[k,aux[i]],true]);
            arr[k]=aux[i++];
        }else if(aux[j]<aux[i]){
            animations.push([[i,j],false]);
            animations.push([[k,aux[j]],true]);
            arr[k]=aux[j++];
        }else{
            animations.push([[i,j],false]);
            animations.push([[k,aux[i]],true]);
            arr[k]=aux[i++];
        }
    }
}

export const quickSort=(arr)=>{
    const copy=[...arr];
    const animations=[];
    QuickSort(copy,0,arr.length-1,animations);
    return animations;
}
const QuickSort=(arr,l,r,animations)=>{
    if(l>=r)return;
    let p=partition(arr,l,r,animations);
    QuickSort(arr,l,p-1,animations);
    QuickSort(arr,p+1,r,animations);
}
const partition=(arr,l,r,animations)=>{
    let pivot=arr[l];
    let i=l;let j=r;
    while(i<j){
        while(i<=r && arr[i]<=pivot){
            animations.push([[i],false]);
            i++;
        }
        while(j>=0 && arr[j]>pivot){
            animations.push([[j],false]);
            j--;
        }
        if(i>=j)break;
        animations.push([[i,arr[j]],true]);
        animations.push([[j,arr[i]],true]);
        swap(arr,i,j);
    }
    animations.push([[l,arr[j]],true]);
    animations.push([[j,arr[l]],true]);
    swap(arr,l,j);
    return j;

}
const swap=(arr,i,j)=>{
    let temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
}
export const insertionSort=(arr)=>{
    const copy=[...arr];
    const animations=[];
    const n=arr.length;
    for(let i=1;i<n;i++){
        let j=i-1;let key=copy[i];
        while(j>=0 && copy[j]>=key){
            animations.push([[(j+1),copy[j]],true]);
            copy[j+1]=copy[j];
            j--;
        }
        animations.push([[(j+1),key],true]);
        copy[j+1]=key;
    }
    return animations;

}
export const selectionSort=(arr)=>{
    const clone=[...arr];
    const animations=[];
    let n=arr.length;
    for(let i=0;i<n;i++){
        let idx=i;let min=clone[i];
        animations.push([[i],false]);
        for(let j=i+1;j<n;j++){
            animations.push([[j],false])
            if(clone[j]<=min){
                min=clone[j];
                idx=j;
            }
        }
        animations.push([[i,clone[idx]],true]);
        animations.push([[idx,clone[i]],true]);
        swap(clone,i,idx);
    }
    return animations;
}
export const bubbleSort=(array)=>{
    const clone=[...array];
    const animations=[];
    const n=array.length;
    for(let i=0;i<n-1;i++){
        for(let j=0;j<n-i-1;j++){
            animations.push([[j],false]);
            animations.push([[j+1],false]);
            if(clone[j]>clone[j+1]){
                animations.push([[j,clone[j+1]],true]);
                animations.push([[j+1,clone[j]],true]);
                swap(clone,j,j+1);
            }
        }
    }
    return animations;
}