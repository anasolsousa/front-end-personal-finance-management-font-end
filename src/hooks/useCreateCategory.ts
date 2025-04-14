
export function useCreateCategory(){

    async function createCategory(name, icon) {
        if(!name || !icon){
            alert("Please fill in the fields")
            return;
        }

        try{
            const response = await fetch("http://localhost:8000/api/auth/categories", {
                method: "POST",
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, 
                    icon
                }),
            });

            const data = await response.json();

            if(response.ok){
                return("Funcionou");
            } else{
                alert(data.message || "Error.");
            }}
            catch(e){
                console.log(e);
            }
    }
    return createCategory;
}
