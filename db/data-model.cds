namespace resume_screening;


entity ResumeData {
    @title : 'Candidate Name'
  key name: String;
  @title : 'Email id'
  eMail: String;
  @title : 'Phone no'
  phoneNo: String;
  @title : 'Experience'
  experience: String;
  @title : 'Expertise'
  expertise: String;
  @title : 'Position'
  position: String;
  @title : 'Confidence level'
  confidencelevel: String; 
  @title : 'Overall Feedback'
  overallFeedback : String;
}