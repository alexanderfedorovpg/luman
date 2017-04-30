<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropAirRecordsRubricIdColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('air_records', function (Blueprint $table) {
            $table->dropForeign('air_records_rubric_id_foreign');
            $table->dropColumn('rubric_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('air_records', function (Blueprint $table) {
            $table->integer('rubric_id')->nullable()->unsigned();

            $table->foreign('rubric_id')->references('id')->on('rubrics')
                ->onDelete('set null')
                ->onUpdate('cascade');
        });
    }
}
