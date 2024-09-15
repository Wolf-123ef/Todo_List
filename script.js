let editIndex = -1;
  document.getElementById("btn").addEventListener("click",()=>{
     var title=document.getElementById("Title").value;
     var description=document.getElementById("Description").value;
      var status=document.getElementById("Status").value;
     var dueDate=document.getElementById("DueDate").value;
    
     if(title && description && status && dueDate){
      var task={
        Title:title,
        Description:description,
        Status:status,
        Due_Date:dueDate
      };
      
        var Data=JSON.parse(localStorage.getItem('Values'))||[];
        if(editIndex === -1) {
            Data.push(task);
          } else {
            Data[editIndex] = task;
            editIndex = -1; 
          }
        localStorage.setItem('Values',JSON.stringify(Data));

      document.getElementById("Title").value="";
      document.getElementById("Description").value="";
      document.getElementById("Status").value="";
      document.getElementById("DueDate").value="";
      display();
    }
    });
  function display(){
    const savedValues=JSON.parse(localStorage.getItem("Values"))||[];
    var container=document.getElementById("result");
    container.innerHTML="";
    if(savedValues.length>0) {
      var table=`
        <table border="2" id="tab">
          <thead>
          <tr class="header">
            <th id="a">Title</th>
            <th id="b">Description</th>
            <th id="c">Status</th>
            <th id="d">Due Date</th>
            <th id="e">Updates</th>
            </tr>
           <thead>
         <tbody>
                `;
            savedValues.forEach((task,index) => {
                 table+=` 
                <tr class="data">
                  <td>${task.Title}</td>
                  <td>${task.Description}</td>
                  <td>${task.Status}</td>
                  <td>${task.Due_Date}</td>
                  <td><i class="fas fa-edit" id="edit" data-index="${index}"></i><i class="fas fa-trash" id="trash" data-index="${index}"></i></td>
                  </tr>
               
      `; 
      });
      table +=` </tbody>
          </table>`;

        container.innerHTML=table;
    }
    addEventListeners();
  }
  document.getElementById('p').addEventListener('click', function () {
            localStorage.removeItem('Values');
            display();
        });
        function addEventListeners() {
            const editIcons = document.querySelectorAll('.fa-edit');
            const deleteIcons = document.querySelectorAll('.fa-trash');

            editIcons.forEach(icon => {
                icon.addEventListener('click', function () {
                    const index = this.getAttribute('data-index');
                    editTask(index);
                });
            });

            deleteIcons.forEach(icon => {
                icon.addEventListener('click', function () {
                    const index = this.getAttribute('data-index');
                    deleteItem(index);
                });
            });
        }
        
       function editTask(index) {
         const savedValues = JSON.parse(localStorage.getItem("Values")) || [];

         document.getElementById("Title").value = savedValues[index].Title;
         document.getElementById("Description").value = savedValues[index].Description;
          document.getElementById("Status").value = savedValues[index].Status;
         document.getElementById("DueDate").value = savedValues[index].Due_Date;

          editIndex = index;
       }

        function deleteItem(index) {
            let Data = JSON.parse(localStorage.getItem('Values')) || [];
            Data.splice(index, 1);
            localStorage.setItem('Values', JSON.stringify(Data));
            display();
        }
    window.onload=display;