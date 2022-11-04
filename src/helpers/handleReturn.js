export const handleReturn = (history) => {
    if(history.length <= 2){
        history.push('/home');
    } else{
        history.goBack();
    }
}