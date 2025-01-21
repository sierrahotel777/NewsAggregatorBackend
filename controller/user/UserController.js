const Student = require('../../models/schema');

class UserController {
    async InputRecord(req, res) {
        try {
            const { inpdata } = req.body;
            const newStudent = new Student(inpdata);
            const savedStudent = await newStudent.save();
            res.status(201).json({ message: 'Student inserted successfully', student: savedStudent });
        } catch (error) {
            console.error('Error inserting student:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async GetRecord(req, res) {
        try {
            const students = await Student.find();
            res.status(200).json({ students });
        } catch (error) {
            console.error('Error fetching students:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async GetRecordById(req, res) {
        try {
            const { id } = req.params;
            const student = await Student.findById(id);
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.status(200).json({ student });
        } catch (error) {
            console.error('Error fetching student:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async UpdateRecordById(req, res) {
        try {
            const { id } = req.params;
            const { grade } = req.body;
            const updatedStudent = await Student.findByIdAndUpdate(id, { grade }, { new: true });
            if (!updatedStudent) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.status(200).json({ message: 'Student grade updated successfully', student: updatedStudent });
        } catch (error) {
            console.error('Error updating student:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async DeleteRecord(req, res) {
        try {
            const { id } = req.params;
            const deletedStudent = await Student.findByIdAndDelete(id);
            if (!deletedStudent) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.status(200).json({ message: 'Student deleted successfully' });
        } catch (error) {
            console.error('Error deleting student:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new UserController();