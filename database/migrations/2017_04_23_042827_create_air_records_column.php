<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAirRecordsColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('air_records', function (Blueprint $table) {
            $table->text('image_preview')->nullable();
            $table->boolean('is_full_video')->default(false);
            $table->integer('rubric_id')->nullable()->unsigned();

            $table->foreign('rubric_id')->references('id')->on('rubrics')
                ->onDelete('set null')
                ->onUpdate('cascade');
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
            $table->dropColumn('is_full_video');
            $table->dropColumn('rubric_id');
            $table->dropColumn('image_preview');
        });
    }
}
