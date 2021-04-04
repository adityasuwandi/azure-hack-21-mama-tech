export default function parseResult(predictions) {
    const data = {
        age : '',
        race : '',
        gender : ''
    }

    function myFunction(item) {
        if (item.tagName.includes('Caucasian') || item.tagName.includes('Indonesian')) {
            if (data.race == ''){
                data.race = item.tagName
            }
        }
        if (item.tagName.includes('Boy') || item.tagName.includes('Girl')) {
            if (data.gender == ''){
                data.gender = item.tagName
            }
        }
        if (item.tagName.includes('Month')) {
            if (data.age == ''){
                data.age = item.tagName
            }
        }
    }


    predictions.forEach(myFunction);

    
    return data
}
