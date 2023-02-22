/**
 * JSON object to pass information for sensor data from one angular component to another.
 * In order to easily access multiple fields of a JSON object from an angular component, we
 * use this interface as a custom Type. Without the interface, the JSON object appears as
 * [Object object] and the information cannot be accessed. This interface makes it so that
 * if the type is declared as CellcountData and the object contains the fields in this interface,
 * the fields can be directly accessed with dot-notation.
 *
 * This interface contains all of the information about a beach's red tide cell count infromation that is
 * being stored in our databse.
 *
 * @author Alex Wills
 */
export interface CellcountData {
  abundance: string,
  county: string,
  location: string,
  date: string,
  source: string
}
