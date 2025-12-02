sap.ui.define([
    "sap/ui/core/mvc/Controller",
   
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("splitmodule.controller.splitview", {
            onInit: function () {

                const oModel = new sap.ui.model.json.JSONModel({

                    person: [

                        {

                            id: 1, name: "Tharun", average_cgpa: 0, emp_texperience: 0,

                            education: [

                                { course: "SSC", institution: "Apms", cgpa: 8.9 },
                                { course: "INTER", institution: "Apms", cgpa: 8.8 },
                                { course: "B-TECH", institution: "Mjra", cgpa: 7.1 },
                            ],

                            employee: [
                                { company_name: "Pivox", role: "jr.developer", phone: 7981894088, joining_date: 2016, relieving_date: 2018 },
                                { company_name: "infosys", role: "developer", phone: 7981894088, joining_date: 2018, relieving_date: 2020 },
                                { company_name: "hcl", role: "sr.developer", phone: 7981894088, joining_date: 2020, relieving_date: "-" }

                            ],
                            employee1: [
                                { company_name: "Pivox", role: "jr.developer", phone: 7981894088, joining_date: 2016, relieving_date: 2018 },
                                { company_name: "infosys", role: "developer", phone: 7981894088, joining_date: 2018, relieving_date: 2020 },
                                { company_name: "hcl", role: "sr.developer", phone: 7981894088, joining_date: 2020, relieving_date: "-" }

                            ],
                            employee2: [
                                { company_name: "Pivox", role: "jr.developer", phone: 7981894088, joining_date: 2016, relieving_date: 2018 },
                                { company_name: "infosys", role: "developer", phone: 7981894088, joining_date: 2018, relieving_date: 2020 },
                                { company_name: "hcl", role: "sr.developer", phone: 7981894088, joining_date: 2020, relieving_date: "-" }

                            ]


                        },

                        {

                            id: 2, name: "Vara", average_cgpa: 0, emp_texperience: 0,

                            education: [

                                { course: "SSC", institution: "Apms", cgpa: 9.5 },
                                { course: "INTER", institution: "Apms", cgpa: 9.7 },
                                { course: "B-TECH", institution: "Mjra", cgpa: 7.8 },
                            ],

                            employee: [
                                { company_name: "Pivox", role: "jr.developer", phone: 9133123432, joining_date: 2015, relieving_date: 2017 },
                                { company_name: "infosys", role: "developer", phone: 9133123432, joining_date: 2017, relieving_date: 2018 },
                                { company_name: "tcs", role: "sr.developer", phone: 9133123432, joining_date: 2018, relieving_date: 2019 },
                                { company_name: "hcl", role: "sr.developer", phone: 9133123432, joining_date: 2020, relieving_date: "-" }

                            ]
                        },


                    ]


                })

                this.getView().setModel(oModel, "employeeModel")

            },



            onItemListPress: function (oEvent) {

                /////Master Page
                this.getView().byId("bUpdateid").setEnabled(true);
                this.getView().byId("bDeleteid").setEnabled(true);

                /// Education Table
                this.getView().byId("eduMinusId").setEnabled(true);
                this.getView().byId("eduUpdateId").setEnabled(true);

                ///  Employee Table
                this.getView().byId("empUpdateId").setEnabled(true);
                this.getView().byId("empMinusId").setEnabled(true);



                ////////////////////

                let oPerson = this.getView().getModel("employeeModel").getProperty("/person");

                this.PersonName = oEvent.getParameter("listItem").getProperty("title");

                oPerson.forEach(oValue => {
                    if (oValue["name"] === this.PersonName) {
                        this.getView().getModel('employeeModel').setProperty('/person1', oValue);
                        this.getView().byId("detailId").setVisible(true)
                    }

                })
                this.avgPercentage();
                this.EmpTotalExperience();
               
            },



            avgPercentage: function () {

                let oPersondetails = this.getView().getModel("employeeModel").getProperty("/person");

                let sName = this.byId("listId").getSelectedItem().getBindingContext("employeeModel").getObject().name;
                oPersondetails.forEach(
                    (value, index) => {
                        
                        if (value["name"] === sName) {
                            let oedu = oPersondetails[index].education;
                            let arr = []
                            oedu.forEach(ovalue => {
                                return arr.push(ovalue.cgpa)
                            }

                            )
                            let start = 0
                            arr.forEach(avalue => {
                                return start += avalue;
                            })

                            value["average_cgpa"] = (start / (arr.length)).toFixed(1)

                            this.getView().getModel("employeeModel").setProperty("/avgperson", value);

                        }
                    }
                )
            },


            EmpTotalExperience: function () {

                let oPersondetails = this.getView().getModel("employeeModel").getProperty("/person");
                let sNameOfPerson = this.byId("listId").getSelectedItem().getBindingContext("employeeModel").getObject().name;

                oPersondetails.forEach(
                    (avalue, iIndex) => {
                        if (avalue["name"] === sNameOfPerson) {

                            let personReliveDate = oPersondetails[iIndex].employee
                            let initial = 0;

                            personReliveDate.forEach(
                                oemployee => {
                                    let joining = oemployee.joining_date;
                                    let relieve = oemployee.relieving_date;
                                    if (relieve == "-") {
                                        let date = new Date();
                                        let nYear = date.getFullYear()
                                        let ilastcompany = (nYear - joining)
                                        initial += ilastcompany
                                    }
                                    else {
                                        let iEmpTotalExp = (relieve - joining)
                                        initial += iEmpTotalExp
                                    }

                                }
                            )

                            avalue["emp_texperience"] = initial;
                            this.getView().getModel("employeeModel").setProperty("/expperson", avalue);

                        }

                    }
                )


            },

            //////////////////////           create        //////////////////

            onDialogPressCreate: function () {
                this.getView().byId("Dialog-box-create").open();
            },
            onPressCreateBack: function () {
                this.getView().byId("Dialog-box-create").close();
            },

            oAddstudentdata: function () {
                let person_id = parseInt(this.getView().byId("formpersonCreateid").getValue());
                let person_name = this.getView().byId("formNameCreateid").getValue();


                let oPerson = {
                    id: person_id,
                    name: person_name,
                    average_cgpa: 0,
                    emp_texperience: 0,
                    education: [],
                    employee: []
                }

                let oNewPersoninfo = this.getView().getModel("employeeModel").getProperty("/person");
                oNewPersoninfo.push(oPerson);
                this.getView().getModel("employeeModel").setProperty("/person", oNewPersoninfo);
                this.getView().byId("Dialog-box-create").close();

            },

            /////////////////////         Update      ////////////////

            onDialogPressUpdate: function () {
                this.getView().byId("Dialog-box-update").open();
            },
            onPressUpdateBack: function () {
                this.getView().byId("Dialog-box-update").close();
            },


            onListUpdatePress: function () {

                let index = this.getView().byId("listId").getSelectedItem().getBindingContext("employeeModel").getPath().split("/")[2];

                let aEducation = this.getView().getModel("employeeModel").getProperty("/person/" + index + "/education");

                let aEmployee = this.getView().getModel("employeeModel").getProperty("/person/" + index + "/employee");

                let iEmpId = this.getView().byId("formpersonUpdateid").getValue();

                let sEmpName = this.getView().byId("formNameUpdateid").getValue();


                let oNewinfo = {
                    id: iEmpId,
                    name: sEmpName,
                    average_cgpa: 0,
                    emp_texperience: 0,
                    education: aEducation,
                    employee: aEmployee
                }


                this.getView().getModel("employeeModel").setProperty("/person/" + index, oNewinfo);
                this.avgPercentage();
                this.EmpTotalExperience();
                this.getView().byId("Dialog-box-update").close();

            },


            //////////////////////////                    delete          /////////////////////

            onListDeletePress: function () {

                let opersondetails = this.getView().getModel("employeeModel").getProperty("/person");

                let oindex = this.getView().byId("listId").getSelectedItem().getBindingContext("employeeModel").getPath().split("/")[2]

                let aEducation = this.getView().getModel("employeeModel").getProperty("/person/" + oindex + "/education");

                let aEmployee = this.getView().getModel("employeeModel").getProperty("/person/" + oindex + "/employee");

                aEducation.splice(0, aEducation.length);

                aEmployee.splice(0, aEmployee.length);

                opersondetails.splice(oindex, 1);

                this.getView().byId("identityid").setText("ID :");

                this.getView().byId("cgpaid").setText("AVG-CGPA :");

                this.getView().byId("nameid").setText("NAME :");

                this.getView().byId("expid").setText("TOTAL EXPERIENCE:");

                this.getView().getModel("employeeModel").setProperty("/person/" + oindex + "/education", aEducation);

                this.getView().getModel("employeeModel").setProperty("/person/" + oindex + "/employee", aEmployee);

                this.getView().getModel("employeeModel").setProperty("/person", opersondetails);

            },

            ///////////////////////////        EDUCATION Table create      /////////////////////

            onTableAddPress: function () {
                this.getView().byId("addtableid").open();
            },

            onPressEduBack: function () {
                this.getView().byId("addtableid").close();
            },

            onPressEduAdd: function () {
                let emp_course = this.getView().byId("tablecourseid").getValue();
                let emp_institution = this.getView().byId("tableinstitutionid").getValue();
                let emp_cgpa = parseInt(this.getView().byId("tablecgpaid").getValue());
                let oPersonDetails = this.getView().getModel("employeeModel").getProperty("/person");
                let oId = this.getView().byId("identityid").getText();
                let oSplitid = oId.split(":")[1];
                let oEqualId = oPersonDetails.findIndex(
                    opersonId => {
                        if (opersonId.id == oSplitid) {

                            return opersonId;
                        }
                    }
                )
                let oPersonTableData = this.getView().getModel("employeeModel").getProperty(`/person/${oEqualId}/education`)
                let oEduDetails = { course: emp_course, institution: emp_institution, cgpa: emp_cgpa }
                oPersonTableData.push(oEduDetails);
                this.getView().getModel("employeeModel").setProperty(`person/${oEqualId}/education`, oEduDetails);
                this.avgPercentage();
                this.EmpTotalExperience();
                this.getView().byId("addtableid").close();


            },


            ///////////////////////               Employeee table create            //////////


            onEmpTableAddPress: function () {
                this.getView().byId("empaddtableid").open();
            },
            onPressEmpBack: function () {
                this.getView().byId("empaddtableid").close();
            },
            onpressEmpAdd: function () {
                let emp_companyN = this.getView().byId("emptablecompanyid").getValue();
                let emp_role = this.getView().byId("emptableroleid").getValue();
                let emp_mobile = parseInt(this.getView().byId("tablephoneid").getValue());
                let emp_join = parseInt(this.getView().byId("tablejoiningid").getValue());
                let emp_relieve = this.getView().byId("tablerelieveid").getValue();


                let oempDetails = this.getView().getModel("employeeModel").getProperty("/person");
                let oId = this.getView().byId("identityid").getText();
                let oSplitid = oId.split(":")[1];
                let oEqualId = oempDetails.findIndex(
                    oempId => {
                        if (oempId.id == oSplitid) {

                            return oempId;
                        }
                    }
                )
                let oEmpTableData = this.getView().getModel("employeeModel").getProperty("/person/" + oEqualId + "/employee")
                let oEmpDetails = { company_name: emp_companyN, role: emp_role, phone: emp_mobile, joining_date: emp_join, relieving_date: emp_relieve }

                oEmpTableData.push(oEmpDetails);


                this.getView().getModel("employeeModel").setProperty("person/" + oEqualId + "/employee", oEmpDetails);
                
                this.avgPercentage();
                this.EmpTotalExperience();
                this.getView().byId("empaddtableid").close();

            },


            ///////////////////////////         table education  update  ////////////////
            onUPressBack: function () {
                this.getView().byId("eduUpdatetableid").close();
            },

            onDialogEduUpdatePress: function () {

                let oindex = this.getView().byId("listId").getSelectedItem().getBindingContext("employeeModel").getPath().split("/")[2];

                let EduDetails = this.getView().byId("eduTableid").getSelectedItem().getBindingContext("employeeModel").getPath().split("/")[3];

                let aEdu = this.getView().getModel("employeeModel").getProperty("/person/" + oindex + "/education/" + EduDetails);

                this.getView().byId("updatetablecourseid").setValue(aEdu.course);

                this.getView().byId("updatetableinstitutionid").setValue(aEdu.institution);

                this.getView().byId("updatetablecgpaid").setValue(aEdu.cgpa);

                this.getView().byId("eduUpdatetableid").open();

            },

            onEduTableUpdatePress: function () {

                let empUpdateindex = this.getView().byId("listId").getSelectedItem().getBindingContext("employeeModel").getPath().split("/")[2];

                let EducationInfo = this.getView().byId("eduTableid").getSelectedItem().getBindingContext("employeeModel").getPath().split("/")[3];

                let scourse = this.getView().byId("updatetablecourseid").getValue();

                let sInstitution = this.getView().byId("updatetableinstitutionid").getValue();

                let ncgpa = this.getView().byId("updatetablecgpaid").getValue();



                let oEduUpdate = { course: scourse, institution: sInstitution, cgpa: ncgpa }

                this.getView().getModel("employeeModel").setProperty("/person/" + empUpdateindex + "/education/" + EducationInfo, oEduUpdate);



                this.getView().byId("eduUpdatetableid").close();

            },

            ///////////////////////                 table employee update             ///////////////
            onPressBack: function () {
                this.getView().byId("empUpdateTableid").close();
            },

            onDialogEmpUpdatePress: function () {

                let empIndex = this.getView().byId("listId").getSelectedItem().getBindingContext("employeeModel").getPath().split("/")[2];

                let Emptable = this.getView().byId("emptableid").getSelectedItem().getBindingContext("employeeModel").getPath().split("/")[3];

                let aEmpdetails = this.getView().getModel("employeeModel").getProperty("/person/" + empIndex + "/employee/" + Emptable);

                this.getView().byId("emptableUpdateCompanyid").setValue(aEmpdetails.company_name);

                this.getView().byId("emptableUpdateroleid").setValue(aEmpdetails.role);

                this.getView().byId("tableUpdatephoneid").setValue(aEmpdetails.phone);

                this.getView().byId("tableUpdatejoiningid").setValue(aEmpdetails.joining_date);

                this.getView().byId("tableUpdaterelieveid").setValue(aEmpdetails.relieving_date);

                this.getView().byId("empUpdateTableid").open();

            },



            onEmpTableUpdatePress: function () {

                let EmpUpdateIndex = this.getView().byId("listId").getSelectedItem().getBindingContext("employeeModel").getPath().split("/")[2];

                let tableEmpUpdateIndex = this.getView().byId("emptableid").getSelectedItem().getBindingContext("employeeModel").getPath().split("/")[3];

                let C_name = this.getView().byId("emptableUpdateCompanyid").getValue();

                let Emp_role = this.getView().byId("emptableUpdateroleid").getValue();

                let emp_phone = this.getView().byId("tableUpdatephoneid").getValue();

                let emp_join = this.getView().byId("tableUpdatejoiningid").getValue();

                let emp_relieve = this.getView().byId("tableUpdaterelieveid").getValue();

                let oEmpTableUpdate = { company_name: C_name, role: Emp_role, phone: emp_phone, joining_date: emp_join, relieving_date: emp_relieve }

                this.getView().getModel("employeeModel").setProperty("/person/" + EmpUpdateIndex + "/employee/" + tableEmpUpdateIndex, oEmpTableUpdate);

                this.avgPercentage();
                this.EmpTotalExperience();

                this.getView().byId("empUpdateTableid").close();

            },


            //////////////////////////////              table Education Delete      //////////////////


            onEduDeletepress: function () {

                let DelEduIndex = this.getView().byId("listId").getSelectedItem().getBindingContext("employeeModel").getPath().split("/")[2];

                let EduTableIndex = this.getView().byId("eduTableid").getSelectedItem().getBindingContext("employeeModel").getPath().split("/")[3];

                let oEduDetails = this.getView().getModel("employeeModel").getProperty("/person/" + DelEduIndex + "/education");

                oEduDetails.splice(EduTableIndex, 1);


                this.avgPercentage();
                this.EmpTotalExperience();

                this.getView().getModel("employeeModel").setProperty("/person/" + DelEduIndex + "/education", oEduDetails);

            },

            //////////////////////////////              table Employee Delete      //////////////////


            onEmpDeletepress: function () {

                let DelEmpIndex = this.getView().byId("listId").getSelectedItem().getBindingContext("employeeModel").getPath().split("/")[2];

                let EmpTableIndex = this.getView().byId("emptableid").getSelectedItem().getBindingContext("employeeModel").getPath().split("/")[3];

                let oEmpDetails = this.getView().getModel("employeeModel").getProperty("/person/" + DelEmpIndex + "/employee");

                oEmpDetails.splice(EmpTableIndex, 1);


                this.avgPercentage();
                this.EmpTotalExperience();

                this.getView().getModel("employeeModel").setProperty("/person/" + DelEmpIndex + "/employee", oEmpDetails);

            },

  /////////////////////////


            /*  sOnSearchSuggest:function(oEvent){
               let sSearchValue=  oEvent.getSource().getValue();
                let aNamefilter=[];
                if(sSearchValue.length>1){
                    let  filter = new sap.m.Filter("name", sap.m.FilterOperator.Contains, sSearchValue);
                    aNamefilter.push(filter);
                
                }
              
                var oList = this.byId("listId");
			var oBinding = oList.getBinding("items");
			oBinding.filter([aNamefilter]);
             } 
 */


        });
    });
