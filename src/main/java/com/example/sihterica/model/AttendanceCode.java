package com.example.sihterica.model;

public enum AttendanceCode {

    WORK_DAY("8", 8),
    ANNUAL_LEAVE("GO", 8),
    DAY_OFF("SL", 1),
    SICK_LEAVE("BO", 8),
    MATERNITY_LEAVE("Porodiljsko odsustvo", 8),
    PAID_LEAVE("Plaćeno odsustvo", 8),
    NIGHT_WORK("Rad noću", 8),
    HOLIDAY_WORK("Rad na dan praznika", 8),
    OVERTIME("Prekovremeni rad", 8),
    FIELD_WORK("Terenski rad", 8),
    ON_CALL_DUTY("Dežurstvo", 8),
    STANDBY("Pripravnost", 8),
    NON_WORKING_HOLIDAY("Neradni radi praznika", 8),
    TEMPORARY_INCAPACITY("Privremena nesposobnost", 8),
    UNPAID_LEAVE("Neplaćeno odsustvo", 8),
    LEAVE_NO_FAULT_OF_EMPLOYEE("Odsustvo bez krivice radnika", 8),
    OTHER_LEAVE("Odsustvo po drugom osnovu", 8);

    private final String label;
    private final int defaultHours;

    AttendanceCode(String label, int defaultHours){
        this.label = label;
        this.defaultHours = defaultHours;
    }

    public String getLabel(){
        return label;
    }

    public int getDefaultHours() {
        return defaultHours;
    }
}
