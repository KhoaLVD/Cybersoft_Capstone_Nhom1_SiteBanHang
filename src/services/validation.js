class validation {
    checkEmpty(value, divId, message) {
        if(value === ""){
            //show error message
        document.getElementById(divId).innerHTML = message;
        document.getElementById(divId).style.display = "block";
        return false;
    }
    //hide error message
        document.getElementById(divId).innerHTML = "";
        document.getElementById(divId).style.display = "none";
        return true;
    }
    checkInteger(value, divId, message){
        const number = /^[0-9]+$/;
        if(value.match(number)){
            //hide error message
            document.getElementById(divId).innerHTML = "";
            document.getElementById(divId).style.display = "none";
            return true;
        }
        //show error message
        document.getElementById(divId).innerHTML = message;
        document.getElementById(divId).style.display = "block";
        return false;
    }
    checkCharactersString(value, divId, message) {
        const letter =
          "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    
        if (value.match(letter)) {
          // hide error message
          document.getElementById(divId).innerHTML = "";
          document.getElementById(divId).style.display = "none";
          return true;
        }
    
        // show error message
        document.getElementById(divId).innerHTML = message;
        document.getElementById(divId).style.display = "block";
        return false;
    }
    checkLength(value, divId, message, min, max){
        if(value.length >= min && value.length <= max){
            // hide error message
            document.getElementById(divId).innerHTML = "";
            document.getElementById(divId).style.display = "none";
            return true;
        } else {
            // show error message
            document.getElementById(divId).innerHTML = message;
            document.getElementById(divId).style.display = "block";
            return false;
        }
    }
    checkOption(idSelect, divId, message) {
        if (document.getElementById(idSelect).selectedIndex !== 0) {
          // hide error message
          document.getElementById(divId).innerHTML = "";
          document.getElementById(divId).style.display = "none";
          return true;
        }
        // show error message
        document.getElementById(divId).innerHTML = message;
        document.getElementById(divId).style.display = "block";
        return false;
    } 
}

export default validation;