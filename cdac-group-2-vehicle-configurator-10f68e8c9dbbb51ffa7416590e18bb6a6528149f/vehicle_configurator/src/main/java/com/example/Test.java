package com.example;

public class Test {

    public static void main(String[] args) {
       // int[] numbers = {29, 3, 7, 90, 45};

        //sortInAsc(numbers);
       // sortInDesc(numbers);
        count("pawan sahu.shivam ramaniya.chirag yadav.ashitosh kudtarkar.");
       // selectionSort(numbers);

    }

    public static void sortInAsc(int[] arr) {

        int temp;

        for(int i=0; i<arr.length; i++){
            for( int j =0; j<arr.length-1-i;j++){
                if(arr[j]>arr[j+1]) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }

        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for(int i=0; i<arr.length; i++){
            sb.append(arr[i]);
            if (i < arr.length - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");
        System.out.println(sb.toString());

    }

    public static void sortInDesc(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] < arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }

        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < arr.length; i++) {
            sb.append(arr[i]);
            if (i <= arr.length - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");
        System.out.println("Descending Order: " + sb.toString());
    }


    public static void selectionSort(int[] arr){

        for( int i = 0; i<arr.length-1; i++){
            int smallest = i;
            for( int j = i+1; j<arr.length; j++){
                if( arr[smallest]>arr[j]){
                    smallest = j;
                }
            }

            int temp = arr[smallest];
            arr[smallest] = arr[i];
            arr[i]= temp;
        }

        StringBuilder sb = new StringBuilder();
        sb.append("[");

        for(int i =0; i<arr.length; i++){
            sb.append(arr[i]);
            if(i<arr.length){
                sb.append(",");
            }
        }
        sb.append("]");
        System.out.println(sb.toString());
    }


    public static void count(String str){
        char[] arr = str.toCharArray();
        int wordCount=0;
        int sentenceCount=0;
        for(int i =0; i< arr.length;i++){

            if(arr[i]==' '){
                wordCount++;
            }else if(arr[i]=='.'){
                wordCount++;
                sentenceCount++;
            }
        }
        System.out.println(wordCount);
        System.out.println(sentenceCount);
        }

//        public static void test(String str){
//            String[] arr = str.split("\\.");
//            for(int i=0; i< arr.length; i++){
//                System.out.print(arr[i]+",");
//            }
//        }




}
