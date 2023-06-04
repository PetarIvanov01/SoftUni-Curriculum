function greatestCommonDivisor(n1, n2) {

    while (n1 !== n2) {
        
        if (n1 > n2) {
            n1 -= n2
        }
        else{
            n2 -= n1
        }
    }
    console.log(n1);

}
greatestCommonDivisor(2154, 458)