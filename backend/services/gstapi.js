//Function to set what the fcking submit will do
//async await as always to not shit everywhere
export const fileGST = async (formData) => {
    //generate a fcking response
    const response = fetch("https://localhost:5000/api/gst", {
        method : "POST",
        header: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(formData)
    });

    //put that fcking data somewhere
    const data = await response.json(); 

    //handle if anything fcks upp
    if (!response.ok) {
        throw new Error(data.error || "Failed to file the GST");
    };

    return data;
}